import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from '../components/login/login';
import OtherComponent from '../components/OtherComponent/OtherComponent';
import SomeComponent from '../components/SomeComponent/SomeComponent';
import PrivateRoute from './Privateroutes';

const AppRoutes = () => (
  <Router>
    <Route exact path={"/"} component={Login} />
    <Route path={"/comp1"} component={SomeComponent} />
    <PrivateRoute path={"/comp2"} component={OtherComponent} isAuthenticated={false} />
  </Router>
);

export default AppRoutes;
