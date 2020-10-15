import React, {Component} from "react";
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
import "../App.css";

class NavBar extends React.Component {
  render() {

    return (<div className="navbar-fixed">
      <Navbar bg="light" variant="light">
        <a href="/">
          <div className="icon"></div>
        </a>
        <a id="home" className="nav-item" href="/" style={{
            marginLeft: "30px"
          }}>WeatherApp</a>
        <a id="home" className="nav-item extras" href="/About">About</a>
        <a id="about" className="nav-item extras" href="/Contact">Contact</a>
      </Navbar>
    </div>);
  }
}

export default NavBar;
