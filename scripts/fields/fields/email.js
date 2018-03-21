import { __ } from "@wordpress/i18n";

import Field from "../components/field";

const emailField = {
  name: "email",
  label: __("Email", "gcf"),
  getBlockSettings(fieldConfig) {
    return {
      edit({ attributes, setAttributes }) {
        return (
          <Field label={fieldConfig.title || fieldConfig.name}>
            {id => (
              <input
                id={id}
                type="email"
                value={attributes.content || ""}
                onChange={event => {
                  setAttributes({ content: event.target.value });
                }}
                placeholder="email@example.com"
              />
            )}
          </Field>
        );
      }
    };
  }
};

export default emailField;
