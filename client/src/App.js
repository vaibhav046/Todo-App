import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import NewTodo from "./components/NewTodo";
import Buckets from "./components/Buckets";
import NewBucket from "./components/NewBucket";

class App extends Component {
  render() {
    return (<Switch>
      <Route exact path="/" component={() => <Buckets />} />
      <Route exact path="/bucket/new" component={NewBucket} />
      <Route exact path="/todo/new/:bucket" component={NewTodo} />
    </Switch>)
  }
}

export default App;
