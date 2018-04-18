# Create custom GCF field types

GCF allows you to register your own custom field types. Defining a field type means defining the `editForm` function of the field (and potentially a `configForm` as well): a higher order component used to edit the field's value.

```js
const myCustomFieldType = {
  // Identifier of your field type, a good practice is use a namespace
  name: "myplugin/field",

  // Label of your field type
  label: "My Custom Field Type",

  // Function returning a Component used to edit the field value.
  editForm: fieldConfig => ({ value, onChange }) => {
    return (
      <label>
        {fieldConfig.title || fieldConfig.name}
        <input
          type="text"
          value={value || ""}
          onChange={event => {
            onChange(event.target.value);
          }}
          placeholder="Write"
        />
      </label>
    );
  }
};

wp.data.dispatch("gcf/fields").register(myCustomFieldType);
```

Last thing, make sure your script registering your custom fields is loaded in Gutenberg before the editor initialization and in the GCF Admin page before the `gcf-config-app` script.
