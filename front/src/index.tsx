import * as React from "react";
import * as  ReactDOM from "react-dom";
import App from "./shared/App";
import "./index.css";
import { Provider } from "react-redux";

import store from "./redux/configureStore";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);