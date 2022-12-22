// gebruik van keyword "rafce" om zo snel de structuur van zo'n component aan te maken (hiervoor de "ES7+ React/Redux/React-Native snippets" extension nodig)
import React from "react";

import "bootstrap/dist/css/bootstrap.css";
//import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import "../style.scss";
const Footer = () => {
  return (
<footer class="text-center text-lg-start">

  <div class="sloganbox p-3">
  Where Students meet Tutors
  </div>

  <div class="contentbox">
  <div class="row mt-3">

    <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-0">
    <h6 class="text-uppercase">about us</h6>
    <hr/>
    <p>
      We are 3 students ...
    </p>
    </div>
    
    <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-0">
    <h6 class="text-uppercase">Useful links</h6>
    <hr/>
    <p><a href="https://www.vub.be/en" target="_blank">VUB - ASA Tutoring</a></p>
    <p><a href="https://www.wikihow.com/Improve-Your-Study-Skills" target="_blank">Improve your study skills</a></p>
    <p><a href="https://www.wikihow.com/Be-a-Good-Tutor" target="_blank">Become a great tutor</a></p>
    </div>

    <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-0">
    <h6 class="text-uppercase">Follow us</h6>
    <hr/>
    <p><a href="#"><Icon.Instagram size={25}/> Instagram</a></p>
    <p><a href="#"><Icon.Twitter size={25}/> Twitter</a></p>
    <p><a href="#"><Icon.Linkedin size={25}/> LinkedIn</a></p>
    </div>

    <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-0">
    <h6 class="text-uppercase">Contact us</h6>
    <hr/>
    <p><a href="#"><Icon.House size={25}/> Straatlaan 34, 3004 Stad, België</a></p>
    <p><a href="#"><Icon.Mailbox size={25}/> asatutoring@vub.be</a></p>
    <p><a href="#"><Icon.Telephone size={25}/> +32 123 456 78</a></p>   
    <p><a href="#"><Icon.Printer size={25}/> +32 123 456 78</a></p>
    </div>
  </div>
  </div>


  <div class="text-center p-3 copyrightbox">
    © 2022 Copyright: 
    <a href="/"> ASA Tutoring</a>
  </div>
</footer>
  );
};

export default Footer;