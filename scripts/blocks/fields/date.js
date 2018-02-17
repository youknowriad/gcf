import React from "react";

import { DatePicker } from "@wordpress/components";
import { settings } from "@wordpress/date";

import Field from "../components/field";

const dateField = {
  getBlockSettings(fieldConfig) {
    return {
      category: "common",
      icon: "text",
      title: "GCF Date",
      isPrivate: true,
      supports: {
        html: false
      },
      attributes: {
        date: {
          type: "string",
          source: "meta",
          meta: fieldConfig.name
        }
      },
      edit({ attributes, setAttributes }) {
        return (
          <Field label={fieldConfig.title || fieldConfig.name}>
            {() => (
              <DatePicker
                locale={settings.l10n.locale}
                currentDate={attributes.date}
                onChange={date => {
                  setAttributes({ date });
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

export default dateField;
