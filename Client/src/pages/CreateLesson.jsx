import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';


import "bootstrap/dist/css/bootstrap.css";
import "../style.scss";

const CreateLesson = () => {
  return (
    <div className="create-lesson">
      <Form>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Row className="">
              <Col md="auto">
                <h3> Creating a new course </h3>
              </Col>
            </Row>
            <Row className="">
              <Col md="auto">
                <Form.Select>
                  <option disabled={true} value="">
                    Select the right course
                  </option>
                  <option value="1">course 1</option>
                  <option value="2">course 2</option>
                </Form.Select>
              </Col>

              <Col md="auto">
                <Form.Select>
                  <option disabled={true} value="">
                    Select the faculty of this course
                  </option>
                  <option value="fac1">faculty 1</option>
                  <option value="fac2">faculty 2</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="">
              <Form.Label>Course information</Form.Label>
              <Col md="5">
                <Form.Control
                  type="number"
                  placeholder="# Years experience with subject"
                />
              </Col>
              <Col md="auto">
                <Form.Control type="number" placeholder="Price in €/h" />
              </Col>
              <Col md="auto">
                <Form.Check
                  type="checkbox"
                  label="Free Test-course"
                  className="checkbox"
                />
              </Col>
            </Row>
            <Form.Label>Course description</Form.Label>

            <Col md="auto">
              <Form.Control
                as="textarea"
                placeholder="Give a description of how to course will be given"
                rows={5}
              />
            </Col>
            <Row></Row>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col md="auto">Select location / map has to be integrapted</Col>
          </Row>

          <Row className="justify-content-md-center">

          <Button type="submit">
        Submit
      </Button>
      </Row>

      </Form>
    </div>
  );
};

export default CreateLesson;
