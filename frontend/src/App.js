import React from 'react';
import axios from 'axios';
import Counter from './Counter';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Counter} />
      <Route path="/admin" component={Admin} />
    </Router>
  );
}

function Admin() {
  function handleClick(amount) {
    axios.post(`${window.location.protocol}//${window.location.hostname}:4000/add`, {
      amount: amount
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function handleReset() {
    axios.delete(`${window.location.protocol}//${window.location.hostname}:4000/reset`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className="admin">
    <ul>
      <li><button type='button' onClick={() => handleClick(50)}>$50</button></li>
      <li><button type='button' onClick={() => handleClick(100)}>$100</button></li>
      <li><button type='button' onClick={() => handleClick(250)}>$250</button></li>
      <li><button type='button' onClick={() => handleClick(500)}>$500</button></li>
      <li><button type='button' onClick={() => handleClick(1000)}>$1000</button></li>
    </ul>
    <div className='admin__reset-holder'>
      <button type='button' onClick={handleReset}>RESET</button>
      </div>
    </div>
  );
}

export default App;



