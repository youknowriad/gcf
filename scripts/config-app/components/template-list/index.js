import React from "react";
import { withAPIData, IconButton } from "@wordpress/components";

import About from "../about";

function TemplateList({ templates, onEdit, onCreateTemplate }) {
  if (!templates.data) {
    return null;
  }

  if (templates.data.length === 0) {
    return <About onCreateTemplate={onCreateTemplate} />;
  }

  return (
    <table className="wp-list-table widefat gcf-template-list">
      <thead>
        <tr>
          <th>Title</th>
          <th>Post Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {templates.data.map(template => (
          <tr key={template.id}>
            <td>{template.title}</td>
            <td>{template.post_type}</td>
            <td>
              <IconButton icon="edit" onClick={() => onEdit(template)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default withAPIData(() => ({
  templates: "/wp/v2/templates"
}))(TemplateList);
