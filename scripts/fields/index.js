import { registerBlockType } from "@wordpress/blocks";
import { select } from "@wordpress/data";

import "./store";
import "./fields";

export function registerBlocksForFields(fields = []) {
  fields.forEach(field => {
    const fieldHandler = select("gcf/fields").get(field.type);

    if (fieldHandler) {
      const blockName = `gcf/gcf-${field.id}`;
      const blockSettings = fieldHandler.getBlockSettings(field);
      registerBlockType(blockName, blockSettings);
    }
  });
}
