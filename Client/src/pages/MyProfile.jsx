import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TutoringSessionInfo from "../components/TutoringSessionInfo";
import TutorInfo from "../components/TutorCard";
import TutoringSessionDescription from "../components/TutoringSessionDescription";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ProfileInfo from "../components/ProfileInfo"
import UpdatePicture from "../components/UpdatePicture";
import ChangePassword from "../components/ChangePassword";

const MyProfile = () => {
  return (
    <div className="MyProfile">
      <Container>
        <Row>
          <Col md="auto">
            <div className="ProfileInformation">
              <ProfileInfo  />
            </div>
          </Col>

          <Col md="auto">
            <Row>
              <div className="ProfilePicture">
                <UpdatePicture/>
              </div>
            </Row>

            <Row>
              <div className="PasswordChangeBox">
                <ChangePassword/>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyProfile;
