<?php

class WP_REST_GCF_Gutenberg_Templates_Controller extends WP_REST_Controller {

	public function __construct() {
		// @codingStandardsIgnoreLine - PHPCS mistakes $this->namespace for the namespace keyword
		$this->namespace = 'gcf/v1';
		$this->rest_base = 'templates';
	}

	public function register_routes() {
		$namespace = $this->namespace;

		register_rest_route( $namespace, '/' . $this->rest_base, array(
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_items' ),
				'permission_callback' => array( $this, 'get_items_permissions_check' ),
			),
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'create_item' ),
				'permission_callback' => array( $this, 'create_item_permissions_check' ),
			),

			'schema' => array( $this, 'get_public_item_schema' ),
		) );

		register_rest_route( $namespace, '/' . $this->rest_base . '/(?P<id>[\w-]+)', array(
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_item' ),
				'permission_callback' => array( $this, 'get_item_permissions_check' ),
			),
			array(
				'methods'             => WP_REST_Server::DELETABLE,
				'callback'            => array( $this, 'remove_item' ),
				'permission_callback' => array( $this, 'remove_item_permissions_check_request' ),
			),
			array(
				'methods'             => WP_REST_Server::EDITABLE,
				'callback'            => array( $this, 'update_item' ),
				'permission_callback' => array( $this, 'update_item_permissions_check' ),
			),

			'schema' => array( $this, 'get_public_item_schema' ),
		) );
	}

	public function get_items_permissions_check( $request ) {
		if ( ! current_user_can( 'edit_posts' ) ) {
			return new WP_Error( 'gcf_template_cannot_read', __( 'Sorry, you are not allowed to view templates.', 'gcf' ), array(
				'status' => rest_authorization_required_code(),
			) );
		}
		return true;
	}

	public function get_items( $request ) {
		$query = array(
			'post_type' => 'gcf-template',
		);
		$templates = get_posts( $query );

		$collection = array();
		foreach ( $templates as $template ) {
			$response = $this->prepare_item_for_response( $template, $request );
			$collection[] = $this->prepare_response_for_collection( $response );
		}

		return rest_ensure_response( $collection );
	}

	public function get_item_permissions_check( $request ) {
		if ( ! current_user_can( 'edit_posts' ) ) {
			return new WP_Error( 'gcf_template_cannot_read', __( 'Sorry, you are not allowed to view templates.', 'gcf' ), array(
				'status' => rest_authorization_required_code(),
			) );
		}
		return true;
	}

	public function get_item( $request ) {
		$id = $request['id'];
		$template = get_post( $id );
		if ( ! $template ) {
			return new WP_Error( 'gcf_reaction_not_found', __( 'No template with that ID found.', 'gcf' ), array(
				'status' => 404,
			) );
		}

		return $this->prepare_item_for_response( $reaction, $request );
	}

	public function create_item_permissions_check( $request ) {
		if ( ! current_user_can( 'edit_posts' ) ) {
			return new WP_Error( 'gcf_template_cannot_creeaete', __( 'Sorry, you are not allowed to create templates.', 'gcf' ), array(
				'status' => rest_authorization_required_code(),
			) );
		}
		return true;
	}

	public function create_item( $request ) {
		$template = $this->prepare_item_for_database( $request );
		if ( is_wp_error( $template ) ) {
			return $template;
		}

		$post_id = wp_insert_post( $template, true );
		if ( is_wp_error( $post_id ) ) {
			return $post_id;
		}

		$template = get_post( $post_id );

		return $this->prepare_item_for_response( $template, $request );
	}


	public function remove_item_permissions_check_request( $request ) {
		if ( ! current_user_can( 'edit_posts' ) ) {
			return new WP_Error( 'gcf_template_cannot_delete', __( 'Sorry, you are not allowed to delete templates.', 'gcf' ), array(
				'status' => rest_authorization_required_code(),
			) );
		}
		return true;
	}

	public function remove_item( $request ) {
		$id = $request['id'];
		wp_delete_post( $id, true );

		return array( 'id' => $id );
	}

	public function update_item_permissions_check( $request ) {
		if ( ! current_user_can( 'edit_posts' ) ) {
			return new WP_Error( 'gcf_template_cannot_edit', __( 'Sorry, you are not allowed to create templates.', 'gcf' ), array(
				'status' => rest_authorization_required_code(),
			) );
		}
		return true;
	}

	public function update_item( $request ) {
		$id = $request['id'];
		$template = $this->prepare_item_for_database( $request );
		if ( is_wp_error( $template ) ) {
			return $template;
		}
		$post_id = wp_insert_post( $template, true );
		if ( is_wp_error( $post_id ) ) {
			return $post_id;
		}
		$template = get_post( $post_id );
		return $this->prepare_item_for_response( $template, $request );
	}

	protected function prepare_item_for_database( $request ) {
		$prepared_template = new stdClass();

		$existing_template = get_post( $request['id'] );
		if ( $existing_template ) {
			$prepared_template->ID = $existing_template->ID;
		}

		$prepared_template->post_type = 'gcf-template';
		$prepared_template->post_status = 'publish';
		$prepared_template->meta_input = array();

		// Title.
		if ( isset( $request['title'] ) && is_string( $request['title'] ) ) {
			$prepared_template->post_title = $request['title'];
		} else {
			return new WP_Error( 'gcf_template_invalid_field', __( 'Invalid template title', 'gcf' ), array(
				'status' => 400,
			) );
		}

		// Post Type.
		if ( isset( $request['post_type'] ) && is_string( $request['post_type'] ) ) {
			$prepared_template->meta_input[ 'post_type' ] = $request[ 'post_type' ];
		} else {
			return new WP_Error( 'gcf_template_invalid_field', __( 'Invalid template post type', 'gcf' ), array(
				'status' => 400,
			) );
		}

		// Lock.
		if ( isset( $request['lock'] ) && is_string( $request[ 'lock' ] ) ) {
			$prepared_template->meta_input[ 'lock' ] = $request[ 'lock' ];
		} else {
			return new WP_Error( 'gcf_template_invalid_field', __( 'Invalid template lock flag', 'gcf' ), array(
				'status' => 400,
			) );
		}

		// Fields.
		if ( isset( $request['fields'] ) ) {
			$prepared_template->meta_input[ 'fields'] = json_encode( $request[ 'fields' ] );
		} else {
			return new WP_Error( 'gcf_template_invalid_field', __( 'Invalid template fields', 'gcf' ), array(
				'status' => 400,
			) );
		}

		return $prepared_template;
	}

	public function prepare_item_for_response( $template, $request ) {
		$data = array(
			'id' => (int) $template->ID,
			'title' => $template->post_title,
			'post_type' => get_post_meta( $template->ID, 'post_type', true ),
			'lock' => get_post_meta( $template->ID, 'lock', true ),
			'fields' => json_decode( get_post_meta( $template->ID, 'fields', true ), true ),
		);

		return rest_ensure_response( $data );
	}

	public function prepare_response_for_collection( $response ) {
		return (array) $response->get_data();
	}

	public function get_item_schema() {
		return array(
			'$schema'          => 'http://json-schema.org/schema#',
			'title'            => 'gcf-template',
			'type'             => 'object',
			'properties'       => array(
				'id'             => array(
					'description'  => __( 'ID that identifies this template.', 'gcf' ),
					'type'         => 'integer',
					'context'      => array( 'view', 'edit' ),
					'readonly'     => true,
				),
				'title'          => array(
					'description'  => __( 'Title of the template.', 'gcf' ),
					'type'         => 'string',
					'context'      => array( 'view', 'edit' ),
					'required'     => true,
				),
				'post_type'      => array(
					'description'  => __( 'The post type.', 'gcf' ),
					'type'         => 'string',
					'context'      => array( 'view', 'edit' ),
					'required'     => true,
				),
				'lock'           => array(
					'description'  => __( 'Locking Config.', 'gcf' ),
					'type'         => 'string',
					'context'      => array( 'view', 'edit' ),
					'required'     => true,
				),
				'fields'         => array(
					'description'  => __( 'The Fields.', 'gcf' ),
					'type'         => 'object',
					'context'      => array( 'view', 'edit' ),
					'required'     => true,
				),
			),
		);
	}
}

/**
 * Registers the Gutenberg Template REST API route needed by p3.
 */
function register_gutenberg_template_route() {
	$controller = new WP_REST_GCF_Gutenberg_Templates_Controller();
	$controller->register_routes();
}
add_action( 'rest_api_init', 'register_gutenberg_template_route' );
