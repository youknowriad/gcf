import React from "react";
import { connect } from "react-redux";
import { IconButton } from "@wordpress/components";

import About from "../about";
import QueryModelList from "../query/model-list";
import { getRecords } from "../../store/selectors";

function TemplateList({ templates, onEdit, onCreateTemplate }) {
  return [
    <QueryModelList modelName="templates" key="query" />,
    templates.length === 0 && (
      <About onCreateTemplate={onCreateTemplate} key="about" />
    ),
    templates.length !== 0 && (
      <table className="wp-list-table widefat gcf-template-list" key="list">
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
    )
  ];
}

export default connect(state => ({
  templates: getRecords(state, "templates")
}))(TemplateList);
