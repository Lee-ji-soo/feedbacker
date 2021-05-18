import React from "react";
import ReactDOM from "react-dom";
import App from "./shared/App";
import reportWebVitals from "./reportWebVitals";
import { analytics } from "./shared/firebase";
import "./index.css";
import { Provider } from "react-redux";

import store from "./redux/configureStore";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

function sendToAnalytics(metric){
  const _report = JSON.stringify(metric);
  
  analytics.logEvent("web_vital_report", _report);
}

reportWebVitals(sendToAnalytics);