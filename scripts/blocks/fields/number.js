import React from "react";

import Field from "../components/field";

const numberField = {
  getBlockSettings(fieldConfig) {
    return {
      category: "common",
      icon: "text",
      title: "GCF Numeric",
      isPrivate: true,
      supports: {
        html: false
      },
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
      },
      save() {
        return null;
      }
    };
  }
};

export default numberField;
