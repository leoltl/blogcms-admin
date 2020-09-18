import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <main className="app">
      <Router>
        <Switch>
          <PrivateRoute path="/admin" component={Home} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </main> 
  );
}

export default App;
