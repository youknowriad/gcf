import { map } from "lodash";

import fieldForm from "./field-form";

const fieldListForm = fields => {
  const fieldForms = map(fields, fieldForm);
  return ({ value, onChange }) => {
    const onChangeField = field => fieldValue => {
      onChange({
        ...value,
        [field.name]: fieldValue
      });
    };

    return map(fields, (field, index) => {
      const EditForm = fieldForms[index];
      return (
        <EditForm
          key={field.id}
          value={value[field.name]}
          onChange={onChangeField(field)}
        />
      );
    });
  };
};

export default fieldListForm;
