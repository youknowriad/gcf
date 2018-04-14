import { __ } from "@wordpress/i18n";

import Field from "../components/field";

const numberField = {
  name: "number",
  label: __("Number", "gutenberg-custom-fields"),
  type: "number",
  editForm: fieldConfig => ({ value, onChange }) => {
    return (
      <Field label={fieldConfig.title || fieldConfig.name}>
        {id => (
          <input
            id={id}
            type="number"
            value={value || ""}
            onChange={event => {
              onChange(event.target.value);
            }}
          />
        )}
      </Field>
    );
  }
};

export default numberField;
