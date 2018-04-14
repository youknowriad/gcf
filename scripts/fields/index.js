import { registerBlockType } from "@wordpress/blocks";
import { select } from "@wordpress/data";

import "./store";
import "./fields";

export { default as FieldForm } from "./components/config/field-form";
export { default as FieldListForm } from "./components/config/field-list-form";

export function registerBlocksForFields(fields = []) {
  fields.forEach(field => {
    const fieldType = select("gcf/fields").get(field.type);
    if (!fieldType) {
      // eslint-disable-next-line no-console
      console.error('field handler for "' + field.type + '" not found');
      return;
    }

    const blockName = `gcf/gcf-${field.id}`;
    const blockSettings = {
      category: "common",
      icon: "block-default",
      title: fieldType.label,
      isPrivate: true,
      supports: {
        html: false
      },
      attributes: {
        content: {
          type: field.type || "string",
          source: "meta",
          meta: field.name
        }
      },
      save: () => null
    };

    if (fieldType.editForm) {
      const EditForm = fieldType.editForm(field);
      blockSettings.edit = ({ attributes, setAttributes }) => {
        return (
          <EditForm
            value={attributes.content}
            onChange={content => setAttributes({ content })}
          />
        );
      };
    }

    if (fieldType.getBlockSettings) {
      Object.assign(blockSettings, fieldType.getBlockSettings(field));
    }

    registerBlockType(blockName, blockSettings);
  });
}
