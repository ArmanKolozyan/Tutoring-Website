import React from "react";
import logo from "../images/Logo.png"

import "bootstrap/dist/css/bootstrap.css";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import "../style.scss";
import { useContext } from "react";
import { PasswordContext } from "../context/PasswordContext";
import { Link, useNavigate } from "react-router-dom";

const Navigationbar = () => {

  const navigate = useNavigate();


  const {logout} = useContext(PasswordContext);

  const {currentUser} = useContext(PasswordContext);
   
  return (
    <div className="navigationbar">
      <Navbar class="navbar" fixed="top" expand="lg">
        <Navbar.Brand href="/">
          <img src={logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="text-end">

        <Nav.Link href="/groupsessions"> <Icon.People size={20} /> Study Together</Nav.Link>
        <Nav.Link href="/tutoringsessions"> <Icon.PersonVideo3 size={20} /> Find tutors</Nav.Link>

        {currentUser ?
        <Nav.Link href={ currentUser ? `/profile/${currentUser.firstname}`: `/`}> <Icon.PersonBoundingBox size={30} /> 
        <span>
        {
          "My Profile"
        }
        </span>
        </Nav.Link>
        : ""
        }
       {currentUser ? 
        <Nav.Link onClick={function(event){ logout(); navigate("/");}}><Icon.BoxArrowRight size={20} />         {
          "Logout"
        }</Nav.Link>
        :
        <Nav.Link href= "/Login"><Icon.BoxArrowRight size={20} />         {
          "Login"
        }</Nav.Link>
       }


        </Navbar.Collapse>

      </Navbar>
    </div>
  );
};

export default Navigationbar;
