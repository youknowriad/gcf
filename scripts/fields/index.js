import { registerBlockType } from "@wordpress/blocks";
import { select } from "@wordpress/data";

import "./store";
import "./fields";

export { default as FieldForm } from "./components/config/field-form";
export { default as FieldListForm } from "./components/config/field-list-form";

export function registerBlocksForFields(fields = []) {
  fields.forEach(field => {
    const fieldHandler = select("gcf/fields").get(field.type);
    if (!fieldHandler) {
      console.error('field handler for "' + field.type + '" not found');
      return;
    }

    const blockName = `gcf/gcf-${field.id}`;
    const blockSettings = {
      category: "common",
      icon: "block-default",
      title: fieldHandler.label,
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

    if (fieldHandler.editForm) {
      const EditForm = fieldHandler.editForm(field);
      blockSettings.edit = ({ attributes, setAttributes }) => {
        return (
          <EditForm
            value={attributes.content}
            onChange={content => setAttributes({ content })}
          />
        );
      };
    }

    if (fieldHandler.getBlockSettings) {
      Object.assign(blockSettings, fieldHandler.getBlockSettings(field));
    }

    registerBlockType(blockName, blockSettings);
  });
}
