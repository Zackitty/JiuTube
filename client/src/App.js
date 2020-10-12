import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import UserList from './components/Auth/UsersList';
import AlertDismissible from "./components/Auth/AlertDismissible"
import SignUp from './components/Auth/SignUp'
import Navbar from "./components/Global/Navbar"
import Signin from "./components/Auth/Signin"


function App() {

  return (
    <BrowserRouter>
        <Switch>
            <Route path="/users">
                <UserList />
            </Route>
            <Route path="/userdismissible"
            component = {AlertDismissible}/>

            <Route path="/"
                component = {Navbar} />
            
            <Route path="/signin" 
                component = {Signin} />
            <Route path="/signup"
                component = {SignUp}
            />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
