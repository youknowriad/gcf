import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import "./style.scss";
import createStore from "./store";
import Layout from "./components/layout";

const store = createStore();

wp.api.init().then(() => {
  render(
    <Provider store={store}>
      <Layout />
    </Provider>,
    document.querySelector(".gutenberg-custom-fields")
  );
});
