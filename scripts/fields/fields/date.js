import { DatePicker } from "@wordpress/components";
import { settings } from "@wordpress/date";
import { __ } from "@wordpress/i18n";

import Field from "../components/field";

const dateField = {
  name: "date",
  label: __("Date", "gutenberg-custom-fields"),
  editForm: fieldConfig => ({ value, onChange }) => {
    return (
      <Field label={fieldConfig.title || fieldConfig.name}>
        {() => (
          <DatePicker
            locale={settings.l10n.locale}
            currentDate={value}
            onChange={onChange}
          />
        )}
      </Field>
    );
  }
};

export default dateField;
