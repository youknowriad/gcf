import { registerBlockType } from "@wordpress/blocks";
import { select } from "@wordpress/data";

import "./store";
import "./fields";

export function registerBlocksForFields(fields = []) {
  fields.forEach(field => {
    const fieldHandler = select("gcf/fields").get(field.type);

    const defaultBlockSettings = {
      category: "common",
      icon: "block-default",
      title: fieldHandler.label,
      isPrivate: true,
      supports: {
        html: false
      },
      attributes: {
        content: {
          type: "string",
          source: "meta",
          meta: field.name
        }
      },
      save: () => null
    };

    if (fieldHandler) {
      const blockName = `gcf/gcf-${field.id}`;
      const blockSettings = {
        ...defaultBlockSettings,
        ...fieldHandler.getBlockSettings(field)
      };
      registerBlockType(blockName, blockSettings);
    }
  });
}
