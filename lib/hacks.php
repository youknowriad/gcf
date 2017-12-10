<?php

/** Hacks that should not be necessary */

function gcf_extend_wp_api_backbone_client() {
	// Localize the wp-api settings and schema.
	$schema_response = rest_do_request( new WP_REST_Request( 'GET', '/wp/v2' ) );
	if ( ! $schema_response->is_error() ) {
		wp_add_inline_script( 'wp-api', sprintf(
			'wpApiSettings.cacheSchema = true; wpApiSettings.schema = %s;',
			wp_json_encode( $schema_response->get_data() )
		), 'before' );
	}
}
add_action( 'admin_enqueue_scripts', 'gcf_extend_wp_api_backbone_client' );


function gcf_get_post_type_show_ui( $post_type_array ) {
	$post_type = get_post_type_object( $post_type_array[ 'slug' ] );
	return $post_type->show_ui;
}

function gcf_add_missing_types_endpoint_fields() {
	register_rest_field( 'type', 'show_ui', array(
		'get_callback' => 'gcf_get_post_type_show_ui',
	) );
}
add_action( 'rest_api_init', 'gcf_add_missing_types_endpoint_fields' );