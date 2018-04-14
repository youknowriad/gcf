<?php

/**
 * Returns Jed-formatted localization data.
 *
 * @since 1.4.0
 *
 * @param  string $domain Translation domain.
 *
 * @return array
 */
function gutenberg_custom_fields_get_jed_locale_data( $domain ) {
	$translations = get_translations_for_domain( $domain );

	$locale = array(
		'' => array(
			'domain' => $domain,
			'lang'   => is_admin() ? get_user_locale() : get_locale(),
		),
	);

	if ( ! empty( $translations->headers['Plural-Forms'] ) ) {
		$locale['']['plural_forms'] = $translations->headers['Plural-Forms'];
	}

	foreach ( $translations->entries as $msgid => $entry ) {
		$locale[ $msgid ] = $entry->translations;
	}

	return $locale;
}

/**
 * Registers the i18n script
 *
 * @since 1.4.0
 */
function gutenberg_custom_fields_i18n_register() {
	$locale_data = gutenberg_custom_fields_get_jed_locale_data( 'gutenberg-custom-fields' );
	$content = 'wp.i18n.setLocaleData( ' . json_encode( $locale_data ) . ', "gutenberg-custom-fields" );';

	wp_register_script(
		'gcf-i18n',
		gutenberg_custom_fields_url( 'scripts/i18n/build/index.js' ),
		array( 'wp-i18n' ),
		filemtime( gutenberg_custom_fields_dir_path() . 'scripts/i18n/build/index.js' )
	);
	wp_add_inline_script( 'gcf-i18n', $content );
}
add_action( 'init', 'gutenberg_custom_fields_i18n_register' );


/**
 * Load plugin text domain for translations.
 *
 * @since 1.4.0
 */
function gutenberg_custom_fields_load_plugin_textdomain() {
	load_plugin_textdomain(
		'gutenberg-custom-fields',
		false,
		plugin_basename( gutenberg_custom_fields_dir_path() ) . '/languages/'
	);
}
add_action( 'plugins_loaded', 'gutenberg_custom_fields_load_plugin_textdomain' );