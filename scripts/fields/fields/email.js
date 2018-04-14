import { __ } from "@wordpress/i18n";

import Field from "../components/field";

const emailField = {
  name: "email",
  label: __("Email", "gutenberg-custom-fields"),
  editForm: fieldConfig => ({ value, onChange }) => {
    return (
      <Field label={fieldConfig.title || fieldConfig.name}>
        {id => (
          <input
            id={id}
            type="email"
            value={value || ""}
            onChange={event => {
              onChange(event.target.value);
            }}
            placeholder="email@example.com"
          />
        )}
      </Field>
    );
  }
};

export default emailField;
