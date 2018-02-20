import Field from "../components/field";

const emailField = {
  getBlockSettings(fieldConfig) {
    return {
      category: "common",
      icon: "text",
      title: "GCF Email",
      isPrivate: true,
      supports: {
        html: false
      },
      attributes: {
        content: {
          type: "string",
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
                type="email"
                value={attributes.content || ""}
                onChange={event => {
                  setAttributes({ content: event.target.value });
                }}
                placeholder="email@example.com"
              />
            )}
          </Field>
        );
      },
      save() {
        return null;
      }
    };
  }
};

export default emailField;
