<?php

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