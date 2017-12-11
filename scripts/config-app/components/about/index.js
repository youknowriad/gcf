import React from "react";

import "./style.scss";

function About({ onCreateTemplate }) {
  const onClick = event => {
    event.preventDefault();
    onCreateTemplate();
  };

  return (
    <div className="gcf-about">
      <h1>Welcome to Gutenberg Custom Fields</h1>
      <p>
        Gutenberg Custom Fields allows you to control the content of the
        Gutenberg edit screen by creating pre-filled templates.
      </p>
      <p>
        Start by{" "}
        <a href="#" onClick={onClick}>
          creating a new template
        </a>, select a post type and add fields as you wish.
      </p>
    </div>
  );
}

export default About;
