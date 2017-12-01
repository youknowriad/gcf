import { registerBlockType } from "@wordpress/blocks";
import fieldHandlers from "./fields";

export default function registerBlocksForFields(fields = []) {
  fields.forEach(field => {
    const fieldHandler = fieldHandlers[field.type];

    if (fieldHandler) {
      const blockName = `gcf/gcf-${field.id}`;
      const blockSettings = fieldHandler.getBlockSettings(field);
      registerBlockType(blockName, blockSettings);
    }
  });
}

// Temporary hack
window.gcf = { blocks: { registerBlocksForFields } };
