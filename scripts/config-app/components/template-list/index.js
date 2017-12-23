import React from "react";
import { IconButton } from "@wordpress/components";

function TemplateList({ templates, onEdit, onCreateTemplate }) {
  if (!templates.length) {
    return null;
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
        {templates.map(template => (
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

export default TemplateList;
