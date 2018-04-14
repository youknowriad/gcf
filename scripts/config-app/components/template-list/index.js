import { IconButton } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import "./style.scss";
import PostTypeLabel from "../post-type-label";

function TemplateList({ templates, onEdit, onRemove }) {
  if (!templates.length) {
    return null;
  }

  return (
    <table className="wp-list-table widefat gcf-template-list">
      <thead>
        <tr>
          <th>{__("Title", "gutenberg-custom-fields")}</th>
          <th>{__("Post Type", "gutenberg-custom-fields")}</th>
          <th>{__("Actions", "gutenberg-custom-fields")}</th>
        </tr>
      </thead>
      <tbody>
        {templates.map(template => (
          <tr key={template.id}>
            <td>{template.title}</td>
            <td>
              <PostTypeLabel slug={template.post_type} />
            </td>
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
