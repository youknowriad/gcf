import Field from "../components/field";

const textField = {
  name: "text",
  label: "Text",
  getBlockSettings(fieldConfig) {
    return {
      edit({ attributes, setAttributes }) {
        return (
          <Field label={fieldConfig.title || fieldConfig.name}>
            {id => (
              <input
                id={id}
                type="text"
                value={attributes.content || ""}
                onChange={event => {
                  setAttributes({ content: event.target.value });
                }}
                placeholder="Write"
              />
            )}
          </Field>
        );
      }
    };
  }
};

export default textField;
