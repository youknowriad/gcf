<?php

/**
 * Project.
 *
 * The main entry point for the Gutenberg Custom Fields Admin Page.
 *
 * @since 1.0.0
 */
function the_gutenberg_custom_fields() {
	?>
	<div class="gutenberg-custom-fields"></div>
	<?php
}

/**
 * Gutenberg Custom Fields' Menu.
 *
 * Adds a new wp-admin menu page for the Gutenberg Custom Fields.
 *
 * @since 0.1.0
 */
function gutenberg_custom_fields_menu() {
	global $menu, $submenu;

	add_menu_page(
		'Gutenberg Custom Fields',
		'GCF',
		'edit_posts',
		'gcf',
		'the_gutenberg_custom_fields',
		'dashicons-edit'
	);
}
add_action( 'admin_menu', 'gutenberg_custom_fields_menu' );

/**
 * Initialize the Gutenberg Custom Fields Admin page
 *
 * @since 1.0.0
 *
 * @param  string   $hook    Page
 */
function gutenberg_custom_fields_init( $hook ) {
	if ( 'toplevel_page_gcf' !== $hook ) {
			return;
	}

	wp_enqueue_script( 'gcf-config-app' );
	wp_enqueue_style( 'gcf-config-app' );
}
add_action( 'admin_enqueue_scripts', 'gutenberg_custom_fields_init' );
