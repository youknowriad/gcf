import { IconButton } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import "./style.scss";

function TemplateList({ templates, onEdit, onRemove, onCreateTemplate }) {
  if (!templates.length) {
    return null;
  }

  return (
    <table className="wp-list-table widefat gcf-template-list">
      <thead>
        <tr>
          <th>{__("Title", "gcf")}</th>
          <th>{__("Post Type", "gcf")}</th>
          <th>{__("Actions", "gcf")}</th>
        </tr>
      </thead>
      <tbody>
        {templates.map(template => (
          <tr key={template.id}>
            <td>{template.title}</td>
            <td>{template.post_type}</td>
            <td className="gcf-template-list__actions">
              <IconButton icon="edit" onClick={() => onEdit(template)} />
              <IconButton icon="trash" onClick={() => onRemove(template)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TemplateList;
