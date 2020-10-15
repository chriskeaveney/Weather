import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import currentLocation from './components/currentLocation';
import forecast from './components/forecast';
import Navbar from './components/Navbar';
import About from './components/About';
import Contact from './components/Contact';

class App extends Component {
  render() {
    return (
       <BrowserRouter>
        <div>
            <Navbar/>
            <Switch>
             <Route exact path="/" component={currentLocation}/>
             <Route path="/about" component={About}/>
             <Route path="/contact" component={Contact}/>
           </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
