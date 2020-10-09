import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Feed, Header, About } from './routers';

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path='/about' component={About} />
                <Route path='/feeds' component={Feed} />
                <Redirect path='/*' to='/feeds' />
            </Switch>
        </BrowserRouter>
    )
};

export default App;
