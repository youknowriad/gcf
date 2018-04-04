import { Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

function TemplateNewButton(props) {
  return (
    <Button className="gcf-template-new-button" isPrimary {...props}>
      {__("Create a new template", "gutenberg-custom-fields")}
    </Button>
  );
}

export default TemplateNewButton;
