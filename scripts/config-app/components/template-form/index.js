import { connect } from "react-redux";
import { cloneDeep, map, head, filter } from "lodash";
import { __, sprintf } from "@wordpress/i18n";
import { withInstanceId, Button } from "@wordpress/components";
import { Component } from "@wordpress/element";

import { FieldListForm } from "@gcf/fields";

import "./style.scss";
import QueryModelList from "../query/model-list";
import { getRecords } from "../../store/selectors";

const LOCK_OPTIONS = [
  {
    value: "none",
    label: __("None", "gutenberg-custom-fields")
  },
  {
    value: "insert",
    label: __("Forbid adding/removing blocks", "gutenberg-custom-fields")
  },
  {
    value: "all",
    label: __(
      "Forbid adding/removing and moving blocks",
      "gutenberg-custom-fields"
    )
  }
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
    this.onChangeFields = this.onChangeFields.bind(this);
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

  onChangeFields(fields) {
    this.setState(state => {
      return {
        editedTemplate: {
          ...state.editedTemplate,
          fields
        }
      };
    });
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
    const { instanceId, onCancel, postTypes, isDisabled } = this.props;
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
            ? __("Creating a new GCF template", "gutenberg-custom-fields")
            : sprintf(
                __("Editing: %s", "gutenberg-custom-fields"),
                editedTemplate.title
              )}
        </h1>

        <div className="gcf-template-form__group">
          <label htmlFor={`template-title-${instanceId}`}>
            {__("Title", "gutenberg-custom-fields")}
          </label>
          <input
            type="text"
            id={`template-title-${instanceId}`}
            value={editedTemplate.title || ""}
            onChange={this.onChangeTitle}
          />
        </div>

        <div className="gcf-template-form__group">
          <label htmlFor={`template-post-type-${instanceId}`}>
            {__("Post Type", "gutenberg-custom-fields")}
          </label>
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
          <label htmlFor={`template-is-locked-${instanceId}`}>
            {__("Lock", "gutenberg-custom-fields")}
          </label>
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

        <FieldListForm
          fields={editedTemplate.fields}
          onChange={this.onChangeFields}
        />

        <div className="gcf-template-form__footer">
          <Button className="button" onClick={onCancel} disabled={isDisabled}>
            {__("Cancel", "gutenberg-custom-fields")}
          </Button>
          <Button type="submit" isPrimary disabled={isDisabled}>
            {__("Save", "gutenberg-custom-fields")}
          </Button>
        </div>
      </form>
    );
  }
}

export default connect(state => ({
  postTypes: getRecords(state, "postTypes")
}))(withInstanceId(TemplateForm));
