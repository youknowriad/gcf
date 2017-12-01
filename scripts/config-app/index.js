import React from "react";
import { render } from "react-dom";
import { APIProvider } from "@wordpress/components";

import "./style.scss";
import Layout from "./components/layout";

wp.api.init().then(() => {
  render(
    <APIProvider {...window.wpApiSettings}>
      <Layout />
    </APIProvider>,
    document.querySelector(".gutenberg-custom-fields")
  );
});
