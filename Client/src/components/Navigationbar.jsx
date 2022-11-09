import React from "react";
import logo from "../images/Logo.png"

import "bootstrap/dist/css/bootstrap.css"; // HIER IS EEN PROBLEEM
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import "../style.scss";

const Navigationbar = () => {
  return (
    <div className="navigationbar">
      <Navbar class="navbar" fixed="top" expand="lg">
        <Navbar.Brand href="#">
          <img src={logo} />
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

        <Nav.Link href="#Study_together" className="ms-auto"> <Icon.People size={20} /> Study Together</Nav.Link>
        <Nav.Link href="#Find_tutors"> <Icon.PersonVideo3 size={20} /> Find tutors</Nav.Link>
        <Nav.Link href="#Summaries"> <Icon.JournalBookmarkFill size={20} /> Summaries</Nav.Link>
        <Nav.Link href="#Search"><Icon.Search size={20} /> Search</Nav.Link>

        
        <NavDropdown className="ms-auto" title=<Icon.Bell size={25} /> id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/dummienoti1clicked">Dummie Notification1</NavDropdown.Item>
          <NavDropdown.Item href="#action/dummienoti2clicked">Dummie Notification2</NavDropdown.Item>
          <NavDropdown.Item href="#action/dummienoti3clicked">Dummie Notification3</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">All Notifications</NavDropdown.Item>
        </NavDropdown>

        
        <Nav.Link href="#Profile"> <Icon.PersonBoundingBox size={30} /> My Profile</Nav.Link>
        <Nav.Link href="/Login"><Icon.BoxArrowRight size={20} /> Login</Nav.Link>


        </Navbar.Collapse>

      </Navbar>
    </div>
  );
};

export default Navigationbar;
