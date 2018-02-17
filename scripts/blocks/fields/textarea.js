import React from "react";

import Field from "../components/field";
import { BlockControls, PlainText } from "@wordpress/blocks";

const textareaField = {
  getBlockSettings(fieldConfig) {
    return {
      category: "common",
      icon: "text",
      title: "GCF Textarea",
      isPrivate: true,
      supports: {
        html: false
      },
      attributes: {
        content: {
          type: "string",
          source: "meta",
          meta: fieldConfig.name
        }
      },
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
      },
      save() {
        return null;
      }
    };
  }
};

export default textareaField;
