import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Counter from "./components/counter/Counter";
import {Presentation} from './containers/presentation';
import { Admin }  from './admin/index';
import "./App.scss";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Presentation} />
      <Route path="/admin" component={Admin} />
    </Router>
  );
}

export default App;
