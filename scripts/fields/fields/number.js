import Field from "../components/field";

const numberField = {
  name: "number",
  label: "Number",
  getBlockSettings(fieldConfig) {
    return {
      attributes: {
        content: {
          type: "number",
          source: "meta",
          meta: fieldConfig.name
        }
      },
      edit({ attributes, setAttributes }) {
        return (
          <Field label={fieldConfig.title || fieldConfig.name}>
            {id => (
              <input
                id={id}
                type="number"
                value={attributes.content || ""}
                onChange={event => {
                  setAttributes({ content: event.target.value });
                }}
              />
            )}
          </Field>
        );
      }
    };
  }
};

export default numberField;
