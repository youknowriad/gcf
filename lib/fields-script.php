<?php

/**
 * Registers the fields script
 *
 * @since 1.3.0
 */
function gutenberg_custom_fields_fields_register() {
	wp_register_script(
		'gcf-fields',
		gutenberg_custom_fields_url( 'scripts/fields/build/index.js' ),
		array( 'wp-element', 'wp-blocks', 'wp-components', 'wp-utils', 'wp-date', 'wp-data', 'wp-i18n', 'gcf-i18n' ),
		filemtime( gutenberg_custom_fields_dir_path() . 'scripts/fields/build/index.js' ),
		true
	);
	wp_register_style(
		'gcf-fields',
		gutenberg_custom_fields_url( 'scripts/fields/build/style.css' ),
		array( 'wp-components' ),
		filemtime( gutenberg_custom_fields_dir_path() . 'scripts/fields/build/style.css' )
	);
}
add_action( 'init', 'gutenberg_custom_fields_fields_register' );
