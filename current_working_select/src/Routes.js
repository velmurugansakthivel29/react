import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { RouteWithLayout,RouteWithProtected,RouteWithLogin } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  ViewProduct as ProductView,
  Retailer as RetailerView,
  Icons as IconsView,
  Account as AccountView,
  AddProduct as AddProductView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/sign-in"
      />
      <RouteWithProtected
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithProtected
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/product"
      />
      <RouteWithProtected
        component={ProductView}
        exact
        layout={MainLayout}
        path="/product/:id"
      />
      <RouteWithProtected
        component={RetailerView}
        exact
        layout={MainLayout}
        path="/retailer"
      />
      <RouteWithProtected
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithProtected
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithProtected
        component={AddProductView}
        exact
        layout={MainLayout}
        path="/addproduct"
      />

      <RouteWithProtected
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLogin
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
