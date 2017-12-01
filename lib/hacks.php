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
