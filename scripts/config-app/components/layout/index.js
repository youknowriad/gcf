import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { connect } from "react-redux";

import "./style.scss";
import About from "../about";
import TemplateList from "../template-list";
import TemplateNewButton from "../template-new-button";
import TemplateForm from "../template-form";
import QueryModelList from "../query/model-list";

import {
  modelCreateRequest,
  modelUpdateRequest,
  modelRemoveRequest
} from "../../store/effects";
import { getRecords } from "../../store/selectors";

class Layout extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      selectedTemplate: null,
      loading: false
    };
    this.onNewTemplate = this.onNewTemplate.bind(this);
    this.onCancelEdition = this.onCancelEdition.bind(this);
    this.onSaveTemplate = this.onSaveTemplate.bind(this);
    this.onEditTemplate = this.onEditTemplate.bind(this);
    this.onRemoveTemplate = this.onRemoveTemplate.bind(this);
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onNewTemplate() {
    this.setState({
      selectedTemplate: {}
    });
  }

  onCancelEdition() {
    this.setState({
      selectedTemplate: null
    });
  }

  onEditTemplate(template) {
    this.setState({
      selectedTemplate: template
    });
  }

  onRemoveTemplate(template) {
    this.props.modelRemoveRequest("templates", template.id).then(() => {
      if (!this.mounted) return;
      if (this.state.selectedTemplate === template) {
        this.setState({ selectedTemplate: null });
      }
    });
  }

  onSaveTemplate(template) {
    const isNew = !template.id;
    const method = isNew
      ? this.props.modelCreateRequest
      : this.props.modelUpdateRequest;
    this.setState({ loading: true });
    method("templates", template).then(() => {
      if (!this.mounted) return;
      this.setState({
        selectedTemplate: null,
        loading: false
      });
    });
  }

  render() {
    const { templates } = this.props;
    const { selectedTemplate, loading } = this.state;
    return (
      <div>
        <QueryModelList modelName="templates" key="query" />

        {selectedTemplate && (
          <TemplateForm
            template={selectedTemplate}
            onCancel={this.onCancelEdition}
            onSubmit={this.onSaveTemplate}
            isDisabled={loading}
          />
        )}

        {!selectedTemplate &&
          !templates.length && <About onCreateTemplate={this.onNewTemplate} />}

        {!selectedTemplate &&
          !!templates.length && (
            <div className="gcf-layout__templates">
              <div className="gcf-layout__templates-header">
                <h1>{__("Your GCF templates", "gutenberg-custom-fields")}</h1>
                <TemplateNewButton onClick={this.onNewTemplate} />
              </div>
              <TemplateList
                onEdit={this.onEditTemplate}
                onRemove={this.onRemoveTemplate}
                onCreateTemplate={this.onNewTemplate}
                templates={templates}
              />
            </div>
          )}
      </div>
    );
  }
}

export default connect(
  state => ({
    templates: getRecords(state, "templates")
  }),
  { modelCreateRequest, modelUpdateRequest, modelRemoveRequest }
)(Layout);
