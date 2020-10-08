import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Main, Header, About } from './components';

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path='/about' component={About} />
                <Route path='/main' component={Main} />
                <Redirect path='/*' to='/main' />
            </Switch>
        </BrowserRouter>
    )
};

export default App;
