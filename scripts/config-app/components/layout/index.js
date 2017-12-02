import React, { Component } from "react";

import "./style.scss";
import TemplateList from "../template-list";
import TemplateNewButton from "../template-new-button";
import TemplateForm from "../template-form";

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
    const request = {
      method: isNew ? "POST" : "PUT",
      path: isNew ? "wp/v2/templates" : `wp/v2/templates/${template.id}`,
      data: template,
      dataType: "json"
    };
    this.setState({ loading: true });
    wp.apiRequest(request).then(body => {
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
        {!selectedTemplate && <TemplateList onEdit={this.onEditTemplate} />}
      </div>
    );
  }
}

export default Layout;
