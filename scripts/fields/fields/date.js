import { DatePicker } from "@wordpress/components";
import { settings } from "@wordpress/date";

import Field from "../components/field";

const dateField = {
  name: "date",
  label: "Date",
  getBlockSettings(fieldConfig) {
    return {
      edit({ attributes, setAttributes }) {
        return (
          <Field label={fieldConfig.title || fieldConfig.name}>
            {() => (
              <DatePicker
                locale={settings.l10n.locale}
                currentDate={attributes.content}
                onChange={content => {
                  setAttributes({ content });
                }}
              />
            )}
          </Field>
        );
      }
    };
  }
};

export default dateField;
