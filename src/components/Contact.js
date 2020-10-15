import '../App.css';
import { Card, Row, Col, Container } from 'react-bootstrap';
import React, {Component} from 'react'
import classnames from "classnames";

class Contact extends React.Component {

render() {
  return(
    <div className="landing-container">
      <div className="row" style={{
          marginTop: "100px"
        }}>
        <div className="col s8 offset-s2">
          <div className="col s12" style={{
              paddingLeft: "11.250px"
            }}>
            <h4>
              <b>Contact</b>
            </h4>
          </div>
          <form action="mailto:ck121@outlook.com" method="post" enctype="text/plain">
            <div className="input-field col s12">
              <input type="text" name="name" className={classnames("")}/>
              <label>First Name</label>
            </div>
            <div className="input-field col s12">
              <input type="text" name="name" className={classnames("")}/>
              <label>Last Name</label>
            </div>
            <div className="input-field col s12">
              <input type="text" name="name" className={classnames("")}/>
              <label>Email</label>
            </div>
            <div className="input-field col s12">
              <textarea id="message" name="message" placeholder="Write Message..." style={{height:"160px"}}></textarea>
            </div>
            <div className="col s12" style={{
                paddingLeft: "11.250px"
              }}>
              <button style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }} type="submit" className="btn btn-large waves-effect waves-light hoverable">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
  }
}

export default Contact;
