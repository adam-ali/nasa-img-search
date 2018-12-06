import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Search from './components/search';
import Asset from './components/asset';

class App extends Component {
  render() {
    return (

      <Router>
        <div>
            <Route path='/search/' exact component={Search} ></Route>      
            <Route path='/asset/:id' component={Asset}></Route>
        </div>
      </Router>

    );
  }
}

export default App;
