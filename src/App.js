import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Feed, Header, About, Login } from './routers';

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path='/about' component={About} />
                <Route path='/feed' component={Feed} />
                <Route path='/login' component={Login} />
            </Switch>
        </BrowserRouter>
    )
};

export default App;
