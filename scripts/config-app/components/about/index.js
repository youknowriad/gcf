import { __ } from "@wordpress/i18n";

import "./style.scss";
import TemplateNewButton from "../template-new-button";

function About({ onCreateTemplate }) {
  const onClick = event => {
    event.preventDefault();
    onCreateTemplate();
  };

  return (
    <div className="gcf-about">
      <h1>{__("Welcome to Gutenberg Custom Fields")}</h1>
      <p>
        {__(
          "Gutenberg Custom Fields allows you to control the content of the Gutenberg edit screen by creating pre-filled templates.",
          "gcf"
        )}
      </p>

      <TemplateNewButton onClick={onCreateTemplate} isLarge />
    </div>
  );
}

export default About;
