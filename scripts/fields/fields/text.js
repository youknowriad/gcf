import { __ } from "@wordpress/i18n";

import Field from "../components/field";

const textField = {
  name: "text",
  label: __("Text", "gutenberg-custom-fields"),
  getBlockSettings(fieldConfig) {
    return {
      edit({ attributes, setAttributes }) {
        return (
          <Field label={fieldConfig.title || fieldConfig.name}>
            {id => (
              <input
                id={id}
                type="text"
                value={attributes.content || ""}
                onChange={event => {
                  setAttributes({ content: event.target.value });
                }}
                placeholder={__("Write", "gutenberg-custom-fields")}
              />
            )}
          </Field>
        );
      }
    };
  }
};

export default textField;
