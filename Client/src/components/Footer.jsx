import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import * as Icon from "react-bootstrap-icons";
import "../style.scss";


/**
 * THE FOOTER COMPONENT
 * @returns 
 */
const Footer = () => {
  return (
    <footer class="text-center text-lg-start">
      <div class="sloganbox p-3">Where Students meet Tutors</div>

      <div class="contentbox">
        <div class="row mt-3">
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-0">
            <h6 class="text-uppercase">about us</h6>
            <hr />
            <p>ASA Tutoring wants to make it possible to achieve a perfect match between a tutor and a student. 
            Moreover, we hope to facilitate and encourage studying with friends. </p>
          </div>

          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-0">
            <h6 class="text-uppercase">Useful links</h6>
            <hr />
            <p>
              <a href="http://localhost:8800/doc" target="_blank"> 
                Our API documentation 
              </a>
            </p>
            <p>
              <a href="https://www.vub.be/en" target="_blank">
                VUB Website
              </a>
            </p>
            <p>
              <a href="https://www.wikihow.com/Improve-Your-Study-Skills" target="_blank">
                Improve your study skills
              </a>
            </p>
            <p>
              <a href="https://www.wikihow.com/Be-a-Good-Tutor" target="_blank">
                Become a great tutor
              </a>
            </p>
          </div>

          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-0">
            <h6 class="text-uppercase">Follow us</h6>
            <hr />
            <p>
              <a href="#">
                <Icon.Instagram size={25} /> Instagram
              </a>
            </p>
            <p>
              <a href="#">
                <Icon.Twitter size={25} /> Twitter
              </a>
            </p>
            <p>
              <a href="#">
                <Icon.Linkedin size={25} /> LinkedIn
              </a>
            </p>
          </div>

          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-0">
            <h6 class="text-uppercase">Contact us</h6>
            <hr />
            <p>
              <a href="#">
                <Icon.House size={25} /> Straatlaan 34, 3004 Stad, België
              </a>
            </p>
            <p>
              <a href="#">
                <Icon.Mailbox size={25} /> asatutoring@vub.be
              </a>
            </p>
            <p>
              <a href="#">
                <Icon.Telephone size={25} /> +32 123 456 78
              </a>
            </p>
            <p>
              <a href="#">
                <Icon.Printer size={25} /> +32 123 456 78
              </a>
            </p>
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
