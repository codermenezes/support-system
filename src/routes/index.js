import React from "react";
import { Switch } from 'react-router-dom'
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import Dashboard from "../pages/Dashboard";
import Route from './Route';
import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/register" component={SignUp} />

      <Route exact path="/dashboard" component={Dashboard} isPrivate />
      <Route exact path="/profile" component={Profile} isPrivate />
    </Switch>
  )
}
