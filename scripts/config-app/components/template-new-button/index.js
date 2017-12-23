import React from "react";
import { Button } from "@wordpress/components";

function TemplateNewButton(props) {
  return (
    <Button className="gcf-template-new-button" isPrimary {...props}>
      Create a new template
    </Button>
  );
}

export default TemplateNewButton;
