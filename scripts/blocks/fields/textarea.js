import React from "react";

import Field from "../components/field";
import { BlockControls } from "@wordpress/blocks";

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
              <textarea
                id={id}
                value={attributes.content || ""}
                onChange={event => {
                  setAttributes({ content: event.target.value });
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
