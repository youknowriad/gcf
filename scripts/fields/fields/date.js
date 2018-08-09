import { DatePicker } from "@wordpress/components";
import { getSettings } from "@wordpress/date";
import { __ } from "@wordpress/i18n";
import { createElement } from "@wordpress/element";

import Field from "../components/field";

const dateField = {
  name: "date",
  label: __("Date", "gutenberg-custom-fields"),
  editForm: fieldConfig => ({ value, onChange }) => {
    const settings = getSettings();
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
