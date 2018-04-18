# Contribute

## Getting Started

GCF is a JavaScript-heavy plugin. The backend is only there to hook into WordPress's different API. The UI is entirely rendered in the client as a React application. The `config-app` script holds the React Application for the admin page area and the `fields` script is a generic script to retrieve, defined and extend field types.

### Local Environment

First, you need a WordPress Environment to run the plugin on, install the Gutenberg plugin from the WordPress plugin repository and then clone this repository right into your `wp-content/plugins` directory.

Next, open a terminal (or if on Windows, a command prompt) and navigate to the repository you cloned. Now type `npm install` to get the dependencies all set up. Then you can type `npm run dev` in your terminal or command prompt to keep the plugin building in the background as you work on it.

## Contribute to the Documentation

Documentation is written in markdown and automatically generated from the [docs](https://github.com/youknowriad/gcf/tree/master/docs) folder.

## Localizing Gutenberg Plugin

To translate GCF in your locale or language, [select your locale here](https://translate.wordpress.org/projects/wp-plugins/gutenberg-custom-fields) and translate _Development_ (which contains the plugin's string) and/or _Development Readme_ (please translate what you see in the Details tab of the [plugin page](https://wordpress.org/plugins/gutenberg/)).

A Global Translation Editor (GTE) or Project Translation Editor (PTE) with suitable rights will process your translations in due time.

Language packs are automatically generated once 95% of the plugin's strings are translated and approved for a locale.
