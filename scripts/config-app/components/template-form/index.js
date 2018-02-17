import React, { Component } from "react";
import { connect } from "react-redux";
import { cloneDeep, map, without, head, values, filter } from "lodash";
import uuid from "uuid/v4";
import { withInstanceId, Button, IconButton } from "@wordpress/components";

import "./style.scss";
import QueryModelList from "../query/model-list";
import { getRecords } from "../../store/selectors";

const AVAILABLE_FIELD_TYPES = [
  "text",
  "image",
  "textarea",
  "number",
  "email",
  "datetime",
  "date",
  "time",
  "free"
];
const LOCK_OPTIONS = [
  { value: "none", label: "None" },
  { value: "insert", label: "Forbid adding/removing blocks" },
  { value: "all", label: "Forbid adding/removing and moving blocks" }
];

class TemplateForm extends Component {
  constructor(props) {
    super(...arguments);
    this.state = {
      editedTemplate: cloneDeep(props.template)
    };
    this.onChangeTitle = this.onChangeProperty("title");
    this.onChangePostType = this.onChangeProperty("post_type");
    this.onChangeLock = this.onChangeProperty("lock");
    this.onAddField = this.onAddField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.template !== this.props.template) {
      this.setState({
        editedTemplate: cloneDeep(newProps.template)
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

  onBlurFieldName(field) {
    return event => {
      const value = event.target.value;
      this.setState(state => {
        const index = state.editedTemplate.fields.indexOf(field);
        if (!!field.title) {
          return;
        }
        const newField = {
          ...field,
          title: value
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
    const defaults = {
      lock: "none",
      post_type: head(this.props.postTypes).slug
    };
    this.props.onSubmit({ ...defaults, ...this.state.editedTemplate });
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

    if (postTypes.length === 0) {
      return <QueryModelList modelName="postTypes" />;
    }

    return (
      <form
        onSubmit={isDisabled ? undefined : this.onSubmit}
        className="gcf-template-form"
      >
        <h1>
          {isNew
            ? "Creating a new Gutenberg custom field template"
            : `Editing: ${editedTemplate.title}`}
        </h1>

        <div className="gcf-template-form__group">
          <label htmlFor={`template-title-${instanceId}`}>Title</label>
          <input
            type="text"
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
            {map(
              filter(
                postTypes,
                postType => postType.show_ui && postType.slug !== "attachment"
              ),
              postType => (
                <option key={postType.slug} value={postType.slug}>
                  {postType.name}
                </option>
              )
            )}
          </select>
        </div>

        <div className="gcf-template-form__group">
          <label htmlFor={`template-is-locked-${instanceId}`}>Lock</label>
          <select
            id={`template-is-locked-${instanceId}`}
            value={editedTemplate.lock || "none"}
            onChange={this.onChangeLock}
          >
            {LOCK_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
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
                    type="text"
                    id={`template-fields-name-${field.id}-${instanceId}`}
                    value={field.name || ""}
                    onChange={this.onChangeField(field, "name")}
                    onBlur={this.onBlurFieldName(field)}
                  />
                </div>

                <div>
                  <label
                    htmlFor={`template-fields-title-${field.id}-${instanceId}`}
                  >
                    Title
                  </label>
                  <input
                    type="text"
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
              className="gcf-template-form__add-field"
              icon="insert"
              onClick={this.onAddField}
            >
              Add Field
            </IconButton>
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

export default connect(state => ({
  postTypes: getRecords(state, "postTypes")
}))(TemplateForm);
