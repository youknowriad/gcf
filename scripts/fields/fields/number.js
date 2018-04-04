import { __ } from "@wordpress/i18n";

import Field from "../components/field";

const numberField = {
  name: "number",
  label: __("Number", "gutenberg-custom-fields"),
  getBlockSettings(fieldConfig) {
    return {
      attributes: {
        content: {
          type: "number",
          source: "meta",
          meta: fieldConfig.name
        }
      },
      edit({ attributes, setAttributes }) {
        return (
          <Field label={fieldConfig.title || fieldConfig.name}>
            {id => (
              <input
                id={id}
                type="number"
                value={attributes.content || ""}
                onChange={event => {
                  setAttributes({ content: event.target.value });
                }}
              />
            )}
          </Field>
        );
      }
    };
  }
};

export default numberField;
