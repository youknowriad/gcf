import { InnerBlocks } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import Field from "../components/field";

const freeField = {
  name: "free",
  label: __("Free HTML Area", "gutenberg-custom-fields"),
  getBlockSettings(fieldConfig) {
    return {
      supports: {
        html: true
      },
      edit() {
        return (
          <Field label={fieldConfig.title || fieldConfig.name}>
            {() => (
              <div className="gcf-freearea">
                <InnerBlocks />
              </div>
            )}
          </Field>
        );
      },
      save() {
        return <InnerBlocks.Content />;
      }
    };
  }
};

export default freeField;
