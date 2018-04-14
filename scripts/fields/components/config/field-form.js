import { map } from "lodash";

import { compose } from "@wordpress/element";
import { withSelect } from "@wordpress/data";
import { withInstanceId } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

function FieldForm({
  field,
  instanceId,
  onChange,
  fieldType,
  availableFieldTypes
}) {
  const onChangeProperty = property => {
    return event => {
      const value = event.target.value;
      const newField = {
        ...field,
        [property]: value
      };
      onChange(newField);
    };
  };

  const onBlurFieldName = event => {
    const value = event.target.value;
    if (field.title) {
      return;
    }
    const newField = {
      ...field,
      title: value
    };
    onChange(newField);
  };

  return (
    <div key={field.id} className="gcf-fields__field-form">
      <div>
        <label htmlFor={`template-fields-name-${field.id}-${instanceId}`}>
          {__("Name", "gutenberg-custom-fields")}
        </label>
        <input
          type="text"
          id={`template-fields-name-${field.id}-${instanceId}`}
          value={field.name || ""}
          onChange={onChangeProperty("name")}
          onBlur={onBlurFieldName}
        />
      </div>

      <div>
        <label htmlFor={`template-fields-title-${field.id}-${instanceId}`}>
          {__("Title", "gutenberg-custom-fields")}
        </label>
        <input
          type="text"
          id={`template-fields-title-${field.id}-${instanceId}`}
          value={field.title || ""}
          onChange={onChangeProperty("title")}
        />
      </div>

      <div>
        <label htmlFor={`template-fields-type-${field.id}-${instanceId}`}>
          {__("Type", "gutenberg-custom-fields")}
        </label>
        <select
          id={`template-fields-type-${field.id}-${instanceId}`}
          value={field.type}
          onChange={onChangeProperty("type")}
        >
          {map(availableFieldTypes, fieldType => (
            <option key={fieldType.name} value={fieldType.name}>
              {fieldType.label}
            </option>
          ))}
        </select>
      </div>

      {fieldType.configForm &&
        fieldType.configForm({ field, instanceId, onChange })}
    </div>
  );
}

export default compose([
  withSelect((select, { availableFieldTypes, field }) => ({
    availableFieldTypes: availableFieldTypes || select("gcf/fields").all(),
    fieldType: select("gcf/fields").get(field.type)
  })),
  withInstanceId
])(FieldForm);
