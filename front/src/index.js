"use strict";
exports.__esModule = true;
var React = require("react");
var ReactDOM = require("react-dom");
var App_1 = require("./shared/App");
var reportWebVitals_1 = require("./reportWebVitals");
var firebaseUtils_1 = require("./utils/firebaseUtils");
require("./index.css");
var react_redux_1 = require("react-redux");
var configureStore_1 = require("./redux/configureStore");
ReactDOM.render(<react_redux_1.Provider store={configureStore_1["default"]}>
    <App_1["default"] />
  </react_redux_1.Provider>, document.getElementById("root"));
function sendToAnalytics(metric) {
    var _report = JSON.stringify(metric);
    firebaseUtils_1.analytics.logEvent("web_vital_report", _report);
}
(0, reportWebVitals_1["default"])(sendToAnalytics);
