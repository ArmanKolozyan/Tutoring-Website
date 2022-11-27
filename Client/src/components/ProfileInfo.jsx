import React, { useState } from "react";
import Logo from "../images/Logo.png";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Multiselect from "react-bootstrap-multiselect";

function ProfileInfo(props) {
  let tutoringSessionName = props.tutoringSessionName;
  let tutoringSessionFac = props.tutoringSessionFac;
  let tutoringSessionPrice = props.tutoringSessionPrice;
  let tutoringSessionFreeTrial = props.tutoringSessionFreeTrial;
  let Experience = props.Experience;
  const [field, setField] = useState([]);

  return (
    <div>
      <Form>
        <Form.Label>Personal information</Form.Label>

        <Row className="justify-content-md-center">
          <Col>
            <FloatingLabel controlId="NameInput" label="Name">
              <Form.Control as="textarea" value={"pieter"} />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="SurenameInput" label="Surname">
              <Form.Control as="textarea" value={"poppiee"} />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col>
            <FloatingLabel controlId="BirthdateInput" label="Birthdate">
              <Form.Control type="date" value="2002-12-23" />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="PhoneNumberInput" label="PhoneNumber">
              <Form.Control as="textarea" value={"0422913456"} />
            </FloatingLabel>
          </Col>
        </Row>

        <Form.Label>Educational information</Form.Label>
        <Row className="justify-content-md-center">
          <Col>
            <FloatingLabel
              controlId="Fields_of_study_followedINput"
              label="Select your field of study"
            >
              <Form.Select required>
                <option value="Science and Bio-engineering Sciences">
                  Science and Bio-engineering Sciences
                </option>
                <option value="Medicine and Pharmacy">
                  Medicine and Pharmacy
                </option>
                <option value="Law and Criminology">Law and Criminology</option>
              </Form.Select>{" "}
            </FloatingLabel>
          </Col>
        </Row>

        <Form.Label>description texts</Form.Label>
        <Row className="justify-content-md-center">
          <Col>
            description to be shown at your profilepage
            <Form.Control
              as="textarea"
              value="testsetssetsetesttesestetetet"
              placeholder="Give a description of yourself that will be shown on your profilepage"
              maxLength={573}
              rows={5}
              required
            />
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col>
            description to be shown at each post you create
            <Form.Control
              as="textarea"
              value="testsetssetsetesttesestetetet"
              placeholder="Give a description of yourself that will be shown on each post you create"
              maxLength={200}
              rows={3}
              required
            />
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col md="auto">
            <Button type="submit">Save Changes</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default ProfileInfo;
