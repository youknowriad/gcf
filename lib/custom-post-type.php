<?php

/**
 * Register a reaction post type, with REST API support
 */
function register_gutenberg_templates() {
	$args = array(
		'public'            => true,
		'show_in_rest'      => true,
		'show_in_nav_menus' => false,
		'show_ui'           => false,
		'label'             => 'Templates',
		'rest_base'         => 'templates',
		'supports'          => [
			'title',
			'custom-fields',
		],
	);
	register_post_type( 'gcf-template', $args );
	register_meta( 'gcf-template', 'post_type', array(
		'show_in_rest' => true,
		'single' => true,
	) );
	register_meta( 'gcf-template', 'lock', array(
		'show_in_rest' => true,
		'single' => true,
	) );
	register_meta( 'gcf-template', 'fields', array(
		'show_in_rest' => true,
		'single' => true,
	) );
}
add_action( 'init', 'register_gutenberg_templates' );
