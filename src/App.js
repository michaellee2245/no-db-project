import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import Home from './components/Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component = { Home } />
          <Route path='/logged-in/user/:id' component = { Home } />
          <Route path ='/login' component = { Login } />
          <Route path ='/profile/:id' component = { Profile } />
        </Switch>
      </Router>
    );
  }
}

export default App;
