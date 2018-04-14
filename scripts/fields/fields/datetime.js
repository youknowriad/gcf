import { DateTimePicker } from "@wordpress/components";
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

const datetimeField = {
  name: "datetime",
  label: __("Date and Time", "gutenberg-custom-fields"),
  editForm: fieldConfig => ({ value, onChange }) => {
    return (
      <Field label={fieldConfig.title || fieldConfig.name}>
        {() => (
          <DateTimePicker
            locale={settings.l10n.locale}
            currentDate={value}
            is12HourTime={is12HourTime}
            onChange={onChange}
          />
        )}
      </Field>
    );
  }
};

export default datetimeField;
