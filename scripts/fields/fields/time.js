import { TimePicker } from "@wordpress/components";
import { settings } from "@wordpress/date";
import { __ } from "@wordpress/i18n";

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

const timeField = {
  name: "time",
  label: __("Time", "gutenberg-custom-fields"),
  editForm: fieldConfig => ({ value, onChange }) => {
    return (
      <Field label={fieldConfig.title || fieldConfig.name}>
        {() => (
          <TimePicker
            locale={settings.l10n.locale}
            currentTime={value}
            is12HourTime={is12HourTime}
            onChange={onChange}
          />
        )}
      </Field>
    );
  }
};

export default timeField;
