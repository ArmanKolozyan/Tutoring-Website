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

        <Nav.Link href="#Study_together" className="ms-auto"> <Icon.People size={20} /> Study Together</Nav.Link>
        <Nav.Link href="#Find_tutors"> <Icon.PersonVideo3 size={20} /> Find tutors</Nav.Link>
        <Nav.Link href="#Summaries"> <Icon.JournalBookmarkFill size={20} /> Summaries</Nav.Link>
        <Nav.Link href="#Search"><Icon.Search size={20} /> Search</Nav.Link>
        
        <NavDropdown id="collasible-nav-dropdown" className="ms-auto" title=<Icon.Bell size={25} />>
          <NavDropdown.Item href="#action/dummienoti1clicked">Dummie Notification1</NavDropdown.Item>
          <NavDropdown.Item href="#action/dummienoti2clicked">Dummie Notification2</NavDropdown.Item>
          <NavDropdown.Item href="#action/dummienoti3clicked">Dummie Notification3</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">All Notifications</NavDropdown.Item>
        </NavDropdown>

        
        <Nav.Link href={ currentUser ? `/profile/${currentUser.firstname}`: `/`}> <Icon.PersonBoundingBox size={30} /> 
        <span>
        {
          currentUser ? currentUser.firstname : "My Profile"
        }
        </span>
        </Nav.Link>
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
