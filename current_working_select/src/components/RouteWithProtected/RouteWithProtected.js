import React from 'react';
import { Redirect,Route } from 'react-router-dom';
import PropTypes from 'prop-types';
const RouteWithProtected = props => {
    const { layout: Layout, component: Component, ...rest } = props;
    const isAuth = (localStorage.getItem('tt') != null);
    return (
        <Route {...rest} render={ props => (
            isAuth ?
                <Layout><Component {...props} /></Layout>
            : <Redirect to="/sign-in" />
        )} />
    );
};


RouteWithProtected.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithProtected;
