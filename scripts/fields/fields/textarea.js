import { __ } from "@wordpress/i18n";
import { PlainText } from "@wordpress/blocks";

import Field from "../components/field";

const textareaField = {
  name: "textarea",
  label: __("Textarea", "gutenberg-custom-fields"),
  editForm: fieldConfig => ({ value, onChange }) => {
    return (
      <Field label={fieldConfig.title || fieldConfig.name}>
        {id => (
          <PlainText
            id={id}
            value={value || ""}
            onChange={onChange}
            placeholder={__("Write", "gutenberg-custom-fields")}
          />
        )}
      </Field>
    );
  }
};

export default textareaField;
