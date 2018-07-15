import { InnerBlocks } from "@wordpress/editor";
import { __ } from "@wordpress/i18n";

import Field from "../components/field";

const freeField = {
  name: "free",
  label: __("Free HTML Area", "gutenberg-custom-fields"),
  getBlockSettings(fieldConfig) {
    return {
      supports: {
        html: true,
        inserter: false
      },
      edit() {
        return (
          <Field label={fieldConfig.title || fieldConfig.name}>
            {() => (
              <div className="gcf-freearea">
                <InnerBlocks templateLock={null} />
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
