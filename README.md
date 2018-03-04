# Gutenberg Custom Fields

Gutenberg Custom Fields allows you to control the content of the Gutenberg edit screen by creating pre-filled templates.

Navigate to the "GCF" admin page, create a new template, select a post type and add fields as you wish.

The Gutenberg Editor will be pre-filled with the corresponding post type's template.

### Features

* Customize the title, the name of the post_meta key and the type of the field.
* Several fields types available: Text, Textarea, Image, Number, Email and more to come.
* Based on Gutenberg Native Extensibility APIs (blocks and templates).
* Templates Lock level.
* Create custom field types
* Add a Free HTML Area

### Custom Field Types

GCF uses the WordPress data module to store the list of available field types. For instance you can retrieve the available field types by calling (`gcf-fields` script must be loaded on the page):

```js
const fieldTypes = wp.data.select("gcf/fields").all();
```

You can use the data module to register new custom field types as well. Defining a field type means defining the `edit` function of the block used to edit this field type for example:

```js
const myCustomFieldType = {
  // Identifier of your field type, a good practice is use a namespace
  name: "myplugin/field",

  // Label of your field type
  label: "My Custom Field Type",

  // Function returning the block settings based on the field configuration
  // The field configuration contains information like the name of the field, the title etc...
  getBlockSettings(fieldConfig) {
    return {
      edit({ attributes, setAttributes }) {
        // By default the content of the field is saved in a block attribute name "content"
        // This attribute is saved as post meta (using the name of the field)
        // The attributes definition can be overridden
        const { content } = attributes;

        return (
          <label>
            {fieldConfig.title || fieldConfig.name}
            <input
              type="text"
              value={attributes.content || ""}
              onChange={event => {
                setAttributes({ content: event.target.value });
              }}
              placeholder="Write"
            />
          </label>
        );
      }
    };
  }
};

wp.data.dispatch("gcf/fields").register(myCustomFieldType);
```

In the example above `getBlockSettings` returns only the mandatory block settings (the `edit` function) and will use the default settings used by GCF. All these default settings can be overridden.

Last thing, make sure your script registering your custom fields is loaded in Gutenberg before the editor initialization and in the GCF Admin page before the `gcf-config-app` script.
