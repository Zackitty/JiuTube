import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUp from './components/Auth/SignUp'
import Navbar from "./components/Global/Navbar"
import Signin from "./components/Auth/Signin"

function App() {


    //  creates routes for front end components
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/"
                    component={Navbar} />

                <Route path="/signin"
                    component={Signin} />
                <Route path="/signup"
                    component={SignUp}
                />
            </Switch>
        </BrowserRouter>
    );
}



export default App;
