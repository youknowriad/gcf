import Field from "../components/field";
import { PlainText } from "@wordpress/blocks";

const textareaField = {
  name: "textarea",
  label: "Textarea",
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
                placeholder="Write"
              />
            )}
          </Field>
        );
      }
    };
  }
};

export default textareaField;
