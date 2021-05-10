import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Header, Feed, About, Login } from './routers';

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
