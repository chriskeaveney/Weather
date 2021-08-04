import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import currentLocation from './components/currentLocation';
import forecast from './components/forecast';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  FormControl,
  Form,
  Button
} from 'react-bootstrap';

class App extends Component {
  render() {
    return (
       <HashRouter basename="/">
        <div>
          <div className="navbar-fixed">
            <Navbar bg="light" variant="light">
              <a href="/">
                <div className="icon"></div>
              </a>
              <Link to="/" className="nav-item" style={{
                  marginLeft: "30px"
                }}>WeatherApp</Link>
              <Link to="/About" className="nav-item extras">Info</Link>
            </Navbar>
          </div>
             <Route exact path="/" component={currentLocation}/>
             <Route path="/About" component={About}/>
        </div>
      </HashRouter>
    );
  }
}

const About = () =>
<div className="App">
  <div className="about-section">
    <h1 style={{
        marginTop: "40px",
        marginBottom: "30px"
      }}>About Weather App</h1>
    <p className="about-subtext">This weather app has everything you need to find the weather data for you.</p>
    <p className="about-subtext">Built for convenience. Designed by Chris Keaveney ©</p>
  </div>

  <div className="row">
    <div className="column">
      <div className="about-card card">
        <div className="about-img"></div>
        <div className="about-container">
          <p className="about-subhead">CONVENIENCE</p>
          <p className="about-p">Find your local weather forecast in real-time.</p>
        </div>
      </div>
    </div>

    <div className="column">
      <div className="about-card card">
        <div className="about-img2"></div>
        <div className="about-container">
          <p className="about-subhead">EXPLORE</p>
          <p className="about-p">Search for real-time weather for any city in the world.</p>
        </div>
      </div>
    </div>

    <div className="column">
      <div className="about-card card">
        <div className="about-img3"></div>
        <div className="about-container">
          <p className="about-subhead">INTERACT</p>
          <p className="about-p">Create and account and login securely to access features.</p>
        </div>
      </div>
    </div>
  </div>
</div>

export default App;
