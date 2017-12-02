import React, { Component } from "react";
import { cloneDeep, map, without, head, values } from "lodash";
import uuid from "uuid/v4";
import {
  withInstanceId,
  withAPIData,
  Button,
  IconButton
} from "@wordpress/components";

import "./style.scss";
const AVAILABLE_FIELD_TYPES = ["text", "image", "textarea", "number", "email"];

class TemplateForm extends Component {
  constructor(props) {
    super(...arguments);
    this.state = {
      editedTemplate: cloneDeep(props.template)
    };
    this.onChangeTitle = this.onChangeProperty("title");
    this.onChangePostType = this.onChangeProperty("post_type");
    this.onAddField = this.onAddField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.template !== this.props.template) {
      this.setState({
        editedTemplate: cloneDeep(newProps.template)
      });
    }

    if (
      newProps.postTypes !== this.props.postTypes &&
      newProps.postTypes.data &&
      !this.state.editedTemplate.post_type
    ) {
      this.setState({
        editedTemplate: {
          ...this.state.editedTemplate,
          post_type: head(values(newProps.postTypes.data)).slug
        }
      });
    }
  }

  onChangeProperty(property) {
    return event => {
      const value = event.target.value;
      this.setState(state => ({
        editedTemplate: {
          ...state.editedTemplate,
          [property]: value
        }
      }));
    };
  }

  onAddField() {
    const newField = {
      id: uuid(),
      type: "text"
    };

    this.setState(state => ({
      editedTemplate: {
        ...state.editedTemplate,
        fields: (state.editedTemplate.fields || []).concat([newField])
      }
    }));
  }

  onChangeField(field, property) {
    return event => {
      const value = event.target.value;
      this.setState(state => {
        const index = state.editedTemplate.fields.indexOf(field);
        const newField = {
          ...field,
          [property]: value
        };
        const newFields = [...state.editedTemplate.fields];
        newFields[index] = newField;
        return {
          editedTemplate: {
            ...state.editedTemplate,
            fields: newFields
          }
        };
      });
    };
  }

  onRemoveField(field) {
    return () => {
      this.setState(state => ({
        editedTemplate: {
          ...state.editedTemplate,
          fields: without(state.editedTemplate.fields, field)
        }
      }));
    };
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.editedTemplate);
  }

  render() {
    const {
      instanceId,
      onCancel,
      onSubmit,
      postTypes,
      isDisabled
    } = this.props;
    const { editedTemplate } = this.state;
    const isNew = !editedTemplate.id;

    if (!postTypes.data) {
      return null;
    }

    return (
      <form
        onSubmit={isDisabled ? undefined : this.onSubmit}
        className="gcf-template-form"
      >
        <h1>
          {isNew
            ? "New Gutenberg Template"
            : `Edit Template ${editedTemplate.title}`}
        </h1>

        <div className="gcf-template-form__group">
          <label htmlFor={`template-title-${instanceId}`}>Title</label>
          <input
            id={`template-title-${instanceId}`}
            value={editedTemplate.title || ""}
            onChange={this.onChangeTitle}
          />
        </div>

        <div className="gcf-template-form__group">
          <label htmlFor={`template-post-type-${instanceId}`}>Post Type</label>
          <select
            id={`template-post-type-${instanceId}`}
            value={editedTemplate.post_type}
            onChange={this.onChangePostType}
          >
            {map(postTypes.data, postType => (
              <option key={postType.slug} value={postType.slug}>
                {postType.name}
              </option>
            ))}
          </select>
        </div>

        <div className="gcf-template-form__group">
          <label>Fields</label>

          <div className="gcf-template-form__fields">
            {map(editedTemplate.fields, field => (
              <div key={field.id} className="gcf-template-form__field">
                <IconButton
                  className="gcf-template-form__remove-field"
                  icon="no-alt"
                  onClick={this.onRemoveField(field)}
                />

                <div>
                  <label
                    htmlFor={`template-fields-name-${field.id}-${instanceId}`}
                  >
                    Name
                  </label>
                  <input
                    id={`template-fields-name-${field.id}-${instanceId}`}
                    value={field.name || ""}
                    onChange={this.onChangeField(field, "name")}
                  />
                </div>

                <div>
                  <label
                    htmlFor={`template-fields-title-${field.id}-${instanceId}`}
                  >
                    Title
                  </label>
                  <input
                    id={`template-fields-title-${field.id}-${instanceId}`}
                    value={field.title || ""}
                    onChange={this.onChangeField(field, "title")}
                  />
                </div>

                <div>
                  <label
                    htmlFor={`template-fields-type-${field.id}-${instanceId}`}
                  >
                    Type
                  </label>
                  <select
                    id={`template-fields-type-${field.id}-${instanceId}`}
                    value={field.type}
                    onChange={this.onChangeField(field, "type")}
                  >
                    {map(AVAILABLE_FIELD_TYPES, fieldType => (
                      <option key={fieldType} value={fieldType}>
                        {fieldType}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}

            <IconButton
              className="button gcf-template-form__add-field"
              icon="plus-alt"
              onClick={this.onAddField}
            />
          </div>
        </div>

        <div className="gcf-template-form__footer">
          <Button className="button" onClick={onCancel} disabled={isDisabled}>
            Cancel
          </Button>
          <Button type="submit" isPrimary disabled={isDisabled}>
            Save
          </Button>
        </div>
      </form>
    );
  }
}

export default withAPIData(() => ({
  postTypes: "/wp/v2/types"
}))(withInstanceId(TemplateForm));
