=== Gutenberg Custom Fields ===
Contributors: youknowriad
Requires at least: 4.8
Tested up to: 4.9
Stable tag: 1.5.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Tags: gutenberg
Requires PHP: 5.2.4

Gutenberg Custom Fields allows you to control the content of the Gutenberg edit screen by creating pre-filled templates.

== Description ==

Gutenberg Custom Fields allows you to control the content of the Gutenberg edit screen by creating pre-filled templates.

Navigate to the "GCF" admin page, create a new template, select a post type and add fields as you wish.

The Gutenberg Editor will be pre-filled with the corresponding post type's template.

= Features =

 - Customize the title, the name of the post_meta key and the type of the field.
 - Several fields types available: Text, Textarea, Image, Number, Email and more to come.
 - Based on Gutenberg Native Extensibility APIs (blocks and templates).
 - Templates Lock level.
 - Create custom field types
 - Add a Free HTML Area

= How can I contribute? =

This plugin is being worked on in <a href="https://github.com/youknowriad/gcf">GitHub</a>

= Documentation =

Documentation can be found [here](https://youknowriad.github.io/gcf/). If you don't find the answers you're looking for, [submit an issue](https://github.com/youknowriad/gcf/issues).

== Changelog ==

= 1.5.0 =
* Add a repeater field (saved as JSON)
* Simplify custom field API
* Small UI tweaks
* Fix i18n issues

= 1.4.0 =
* Internationalize the plugin

= 1.3.0 =
* Allow creating third-party GCF field types
* Add a Free HTML content area field saved to post content.
* Add a composer.json to allow using the repository from wpackagist.
* Use WordPress packages and last Gutenberg components.

= 1.2.0 =
* Add Date, DateTime and Time field types.
* Disable the HTML mode for all the Custom Fields Blocks.

= 1.1.0 =
* Fix Image Field Type per Gutenberg 2.1 update.
* Adding a button to remove templates.

= 1.0.0 =
* Tweak the UI and the Flow to create templates.

= 0.2.1 =
* Fix script loading order.

= 0.2.0 =
* Adding introduction to the GCF admin page.
* Use Redux for state management, fixes refreshing issues.
* Exclude hidden and attachment post types.
* Support template locks.
* Small UI polish.

= 0.1.0 =
* First release of the plugin.
