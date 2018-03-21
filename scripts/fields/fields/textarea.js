import { __ } from "@wordpress/i18n";
import { PlainText } from "@wordpress/blocks";

import Field from "../components/field";

const textareaField = {
  name: "textarea",
  label: __("Textarea", "gcf"),
  getBlockSettings(fieldConfig) {
    return {
      edit({ attributes, setAttributes }) {
        return (
          <Field label={fieldConfig.title || fieldConfig.name}>
            {id => (
              <PlainText
                id={id}
                value={attributes.content || ""}
                onChange={content => {
                  setAttributes({ content });
                }}
                placeholder={__("Write", "gcf")}
              />
            )}
          </Field>
        );
      }
    };
  }
};

export default textareaField;
