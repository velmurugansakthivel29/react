import React from 'react';
import { Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, }) => {
    if (!isAuthenticated) {
        return <Redirect to="/" />
    }
    return <Component />
}

export default PrivateRoute;