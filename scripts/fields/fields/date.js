import { DatePicker } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { createElement } from "@wordpress/element";

import Field from "../components/field";

const dateField = {
  name: "date",
  label: __("Date", "gutenberg-custom-fields"),
  editForm: fieldConfig => ({ value, onChange }) => {
    return (
      <Field label={fieldConfig.title || fieldConfig.name}>
        {() => <DatePicker currentDate={value} onChange={onChange} />}
      </Field>
    );
  }
};

export default dateField;
