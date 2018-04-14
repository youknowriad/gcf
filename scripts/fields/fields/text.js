import { __ } from "@wordpress/i18n";

import Field from "../components/field";

const textField = {
  name: "text",
  label: __("Text", "gutenberg-custom-fields"),
  editForm: fieldConfig => ({ value, onChange }) => {
    return (
      <Field label={fieldConfig.title || fieldConfig.name}>
        {id => (
          <input
            id={id}
            type="text"
            value={value || ""}
            onChange={event => {
              onChange(event.target.value);
            }}
            placeholder={__("Write", "gutenberg-custom-fields")}
          />
        )}
      </Field>
    );
  }
};

export default textField;
