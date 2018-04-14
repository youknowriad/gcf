import { select } from "@wordpress/data";

const fieldForm = field => {
  const fieldType = select("gcf/fields").get(field.type);
  if (!fieldType) {
    // eslint-disable-next-line no-console
    console.error('field handler for "' + field.type + '" not found');
    return;
  }
  return fieldType.editForm(field);
};

export default fieldForm;
