import { withInstanceId } from "@wordpress/components";

import "./style.scss";
function Field({ instanceId, label, children }) {
  const id = `gcf-field-${instanceId}`;
  return (
    <div className="gcf-blocks-field">
      <label htmlFor={id}>{label}</label>
      {children(id)}
    </div>
  );
}

export default withInstanceId(Field);
