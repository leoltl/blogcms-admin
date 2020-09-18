import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { tokenManager } from '../RemoteAPI/API';

function PrivateRoute({ component: Component, ...rest}) {
  return (
    <Route {...rest} render={(props) => (
      tokenManager.isAuthenticated
        ? <Component {...props} />
        : <Redirect to='/' />
      )} 
    />
  )
}

export default PrivateRoute;
