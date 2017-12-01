import React from "react";
import { withAPIData } from "@wordpress/components";

function TemplateList({ templates }) {
  if (!templates.data) {
    return null;
  }

  if (templates.data.length === 0) {
    return <div>No Template Yet!</div>;
  }

  return (
    <table className="wp-list-table widefat gcf-template-list">
      <thead>
        <tr>
          <th>Title</th>
          <th>Post Type</th>
        </tr>
      </thead>
      <tbody>
        {templates.data.map(template => (
          <tr key={template.id}>
            <td>{template.title}</td>
            <td>{template.post_type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default withAPIData(() => ({
  templates: "/wp/v2/templates"
}))(TemplateList);
