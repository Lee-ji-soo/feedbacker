import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Diary, Header, About } from './components';

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path='/about' component={About} />
                <Route path='/diary' component={Diary} />
                <Redirect path='/*' to='/diary' />
            </Switch>
        </BrowserRouter>
    )
};

export default App;
