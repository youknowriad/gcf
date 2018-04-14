<?php

/**
 * Registers the config app script
 *
 * @since 1.3.0
 */
function gutenberg_custom_fields_config_app_register() {
	wp_register_script(
		'gcf-config-app',
		gutenberg_custom_fields_url( 'scripts/config-app/build/index.js' ),
		array( 'gcf-fields', 'wp-data', 'wp-element', 'wp-components', 'wp-api', 'wp-api-request', 'wp-i18n', 'gcf-i18n', 'wp-core-data' ),
		filemtime( gutenberg_custom_fields_dir_path() . 'scripts/config-app/build/index.js' ),
		true
	);
	wp_register_style(
		'gcf-config-app',
		gutenberg_custom_fields_url( 'scripts/config-app/build/style.css' ),
		array( 'wp-components' ),
		filemtime( gutenberg_custom_fields_dir_path() . 'scripts/config-app/build/style.css' )
	);
}
add_action( 'init', 'gutenberg_custom_fields_config_app_register' );
