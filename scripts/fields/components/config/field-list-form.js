import { without, map } from "lodash";
import uuid from "uuid/v4";

import { IconButton } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";

import FieldForm from "./field-form";

function FieldListForm({ fields = [], onChange, availableFieldTypes }) {
  const onRemoveField = field => () => {
    onChange(without(fields, field));
  };

  const onChangeField = field => newField => {
    const index = fields.indexOf(field);
    const newFields = [...fields];
    newFields[index] = newField;
    onChange(newFields);
  };

  const onAddField = () => {
    const newField = {
      id: uuid(),
      type: "text"
    };

    onChange(fields.concat([newField]));
  };

  return (
    <div className="gcf-fields__field-list-form">
      <label>{__("Fields", "gutenberg-custom-fields")}</label>

      <div className="gcf-template-form__fields">
        {map(fields, field => (
          <div key={field.id} className="gcf-template-form__field">
            <IconButton
              className="gcf-template-form__remove-field"
              icon="no-alt"
              onClick={onRemoveField(field)}
            />

            <FieldForm
              field={field}
              onChange={onChangeField(field)}
              availableFieldTypes={availableFieldTypes}
            />
          </div>
        ))}

        <IconButton
          className="gcf-template-form__add-field"
          icon="insert"
          onClick={onAddField}
        >
          {__("Add Field", "gutenberg-custom-fields")}
        </IconButton>
      </div>
    </div>
  );
}

export default withSelect(select => ({
  availableFieldTypes: select("gcf/fields")
    .all()
    .filter(field => field.editForm)
}))(FieldListForm);
