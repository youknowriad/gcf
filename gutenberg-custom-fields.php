<?php
/**
 * Plugin Name: Gutenberg Custom Fields
 * Plugin URI: https://github.com/youknowriad/gcf
 * Description: Custom Fields, The Gutenberg way
 * Version: 1.5.1
 * Text Domain: gutenberg-custom-fields
 * Domain Path: /languages
 * Author: Riad Benguella
 *
 * @package gcf
 */

 // Some common utilities
require_once dirname( __FILE__ ) . '/lib/common.php';

// Hacks to WP APIs
require_once dirname( __FILE__ ) . '/lib/hacks.php';

// Registering Script Files
require_once dirname( __FILE__ ) . '/lib/i18n-script.php';
require_once dirname( __FILE__ ) . '/lib/fields-script.php';
require_once dirname( __FILE__ ) . '/lib/config-app-script.php';

// Templates CPT
require_once dirname( __FILE__ ) . '/lib/custom-post-type.php';

// Templates Endpoint
require_once dirname( __FILE__ ) . '/lib/endpoint.php';

// Enhancing Gutenberg with the active template
require_once dirname( __FILE__ ) . '/lib/register-templates.php';

// The Admin config page
require_once dirname( __FILE__ ) . '/lib/config-app-page.php';
