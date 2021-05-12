import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Header, Feed, About, Login } from "./routers";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/about" exact component={About} />
        <Route path="/feed" exact component={Feed} />
        <Route path="/login" exact component={Login} />
        <Route path="/" component={Feed} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
