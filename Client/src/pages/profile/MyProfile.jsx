import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProfileInfo from "../../components/profile/ProfileInfo";
import UpdatePicture from "../../components/profile/UpdatePicture";

/**
 * COMPONENT FOR VIEWING AND EDITING MY OWN PROFILE.
 */
const MyProfile = () => {
  return (
    <div className="MyProfile">
      <Container>
        <Row>
          <Col md="auto">
            <div className="ProfileInformation">
              <ProfileInfo />
            </div>
          </Col>

          <Col md="auto">
            <Row>
              <div className="ProfilePicture">
                <UpdatePicture />
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyProfile;
