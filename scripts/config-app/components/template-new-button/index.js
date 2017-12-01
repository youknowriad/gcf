import React from "react";
import { Button } from "@wordpress/components";

function TemplateNewButton(props) {
  return (
    <Button isPrimary {...props}>
      New Template
    </Button>
  );
}

export default TemplateNewButton;
