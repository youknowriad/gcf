import Field from "../components/field";
import { InnerBlocks } from "@wordpress/blocks";

const freeField = {
  getBlockSettings(fieldConfig) {
    return {
      category: "common",
      icon: "layout",
      title: "GCF Free Area",
      isPrivate: true,
      edit({ attributes, setAttributes }) {
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
