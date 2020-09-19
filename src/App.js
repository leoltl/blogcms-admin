import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <PrivateRoute path="/admin" component={Home} />
          <Route path="/" exact={true} component={Login} />
        </Switch>
      </Router>
    </div> 
  );
}

export default App;
