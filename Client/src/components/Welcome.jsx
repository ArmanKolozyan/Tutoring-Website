import React from "react";
import Logo from "../images/Logo.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { PasswordContext } from "../context/PasswordContext";

const Welcome = () => {
  const { currentUser } = useContext(PasswordContext);
  return (
    <div className="welcome">
      <hr />
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <div className="title" style={{ "overflow-wrap": "break-word" }}>
        <p>Welcome</p>
      </div>
      <div className="subtitle">
        <p>to ASA Tutoring</p>
      </div>
      <div className="introduction">
        <div class="row mt-3">
          <div class="col-xl-4 mx-auto mb-1">
            <p>
              ASA Tutoring is a webservice created by 3 students of the Computer Science branch at the Vrije
              Universiteit Brussel. The webservice was founded with the purpose of assisting VUB students in their
              studies.
            </p>
          </div>
          <div class="col-xl-4 mx-auto mb-1">
            <p>
              Students can search for tutoring sessions on subjects they are struggling with. They can also create group
              sessions with other students to discuss subject matters or study together. And much more!
            </p>
          </div>
        </div>
      </div>
      <div class="banner">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Link to={currentUser ? "/tutoringsessions" : "/login"}>
                <Button>Find Tutoring Sessions</Button>
              </Link>
            </Col>

            <Col md="auto">
              <Link to={currentUser ? "/createtutoringsession" : "/login"}>
                <Button>Create Tutoring Session</Button>
              </Link>
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col md="auto">
              <Link to={currentUser ? "/groupsessions" : "/login"}>
                <Button>Find Study Together Posts</Button>
              </Link>
            </Col>

            <Col md="auto">
              <Link to={currentUser ? "/creategroupsession" : "/login"}>
                <Button>Create Study Together Post</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Welcome;
