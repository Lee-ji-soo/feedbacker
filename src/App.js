import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { News, Header, About } from './routers';

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path='/about' component={About} />
                <Route path='/news' component={News} />
                <Redirect path='/*' to='/news' />
            </Switch>
        </BrowserRouter>
    )
};

export default App;
