import React, { Component } from "react";
import { connect } from "react-redux";

import "./style.scss";
import TemplateList from "../template-list";
import TemplateNewButton from "../template-new-button";
import TemplateForm from "../template-form";

import { modelCreateRequest, modelUpdateRequest } from "../../store/effects";

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
    const { selectedTemplate, loading } = this.state;
    return (
      <div>
        <div className="gcf-layout__header">
          <TemplateNewButton onClick={this.onNewTemplate} />
        </div>

        {selectedTemplate && (
          <TemplateForm
            template={selectedTemplate}
            onCancel={this.onCancelEdition}
            onSubmit={this.onSaveTemplate}
            isDisabled={loading}
          />
        )}

        {!selectedTemplate && (
          <TemplateList
            onEdit={this.onEditTemplate}
            onCreateTemplate={this.onNewTemplate}
          />
        )}
      </div>
    );
  }
}

export default connect(undefined, { modelCreateRequest, modelUpdateRequest })(
  Layout
);
