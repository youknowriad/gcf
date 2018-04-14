import { map } from "lodash";

import { __ } from "@wordpress/i18n";
import { IconButton } from "@wordpress/components";

import Field from "../components/field";
import ConfigFieldListForm from "../components/config/field-list-form";
import editFieldListForm from "../components/edit/field-list-form";

const repeaterField = {
  name: "repeater",
  label: __("Repeater", "gutenberg-custom-fields"),
  editForm: fieldConfig => {
    const EditFieldListForm = editFieldListForm(fieldConfig.fields);

    return ({ value, onChange }) => {
      const values = value ? JSON.parse(value) : [];
      const onChangeSubValue = index => subValue => {
        const newValues = [...values];
        newValues[index] = subValue;
        onChange(JSON.stringify(newValues));
      };
      const onRemoveSubValue = index => () => {
        const newValues = [
          ...values.slice(0, index),
          ...values.slice(index + 1)
        ];
        onChange(JSON.stringify(newValues));
      };
      const onAddRow = () => {
        const newValues = [...values, {}];
        onChange(JSON.stringify(newValues));
      };

      return (
        <Field label={fieldConfig.title || fieldConfig.name}>
          {() => (
            <div>
              {map(values, (subValue, index) => (
                <div key={index} className="gcf-fields-repeater__row">
                  <EditFieldListForm
                    value={subValue}
                    onChange={onChangeSubValue(index)}
                  />
                  <IconButton
                    className="gcf-fields-repeater__row-remove"
                    icon="no-alt"
                    onClick={onRemoveSubValue(index)}
                  />
                </div>
              ))}

              <IconButton
                className="button gcf-template-form__add-field"
                icon="insert"
                onClick={onAddRow}
              >
                {__("Add Row", "gutenberg-custom-fields")}
              </IconButton>
            </div>
          )}
        </Field>
      );
    };
  },
  configForm: ({ field, onChange }) => {
    const onChangeFields = fields => {
      onChange({
        ...field,
        fields
      });
    };
    return (
      <ConfigFieldListForm fields={field.fields} onChange={onChangeFields} />
    );
  }
};

export default repeaterField;
