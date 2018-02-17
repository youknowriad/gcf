import React from "react";

import { DateTimePicker } from "@wordpress/components";
import { settings } from "@wordpress/date";

import Field from "../components/field";

// To know if the current timezone is a 12 hour time with look for "a" in the time format
// We also make sure this a is not escaped by a "/"
const is12HourTime = /a(?!\\)/i.test(
  settings.formats.time
    .toLowerCase() // Test only the lower case a
    .replace(/\\\\/g, "") // Replace "//" with empty strings
    .split("")
    .reverse()
    .join("") // Reverse the string and test for "a" not followed by a slash
);

const datetimeField = {
  getBlockSettings(fieldConfig) {
    return {
      category: "common",
      icon: "text",
      title: "GCF DateTime",
      isPrivate: true,
      supports: {
        html: false
      },
      attributes: {
        datetime: {
          type: "string",
          source: "meta",
          meta: fieldConfig.name
        }
      },
      edit({ attributes, setAttributes }) {
        return (
          <Field label={fieldConfig.title || fieldConfig.name}>
            {() => (
              <DateTimePicker
                locale={settings.l10n.locale}
                currentDate={attributes.datetime}
                is12HourTime={is12HourTime}
                onChange={datetime => {
                  setAttributes({ datetime });
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

export default datetimeField;
