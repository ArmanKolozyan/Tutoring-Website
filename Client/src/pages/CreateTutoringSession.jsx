import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "../style.scss";
import axios from "axios";
import moment from "moment";
import { PasswordContext } from "../context/PasswordContext";
import { useContext } from "react";


const CreateTutoringSession = () => {
  const [course, setCourse] = useState();
  const [field, setField] = useState();
  const [exp, setExp] = useState();
  const [price, setPrice] = useState();
  const [test, setTest] = useState();
  const [desc, setDesc] = useState();

  const {currentUser} = useContext(PasswordContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      axios({
        method: "post",
        withCredentials: true,
        headers: {"Content-Type": "application/json" }, 
        url: "http://localhost:8800/posts/",
        data: {
          course,
          field,
          desc,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          exp,
          price,
          test,
        }});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-tutoring-session">
      <Form onSubmit={(event) => handleSubmit(event)}>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Row className="">
              <Col md="auto">
                <h3> Create a new tutoring session </h3>
              </Col>
            </Row>
            <Row className="">
              <Col md="auto">
                <Form.Select required onChange={(e) => setField(e.target.value)}>
                  <option disabled={true} selected value="">
                    Select the faculty of the subject
                  </option>
                  <option value="Science and Bio-engineering Sciences">Science and Bio-engineering Sciences</option>
                  <option value="Medicine and Pharmacy">Medicine and Pharmacy</option>
                  <option value="Law and Criminology">Law and Criminology</option>
                </Form.Select>
              </Col>

              <Col md="auto">
                <Form.Select required onChange={(e) => setCourse(e.target.value)}>
                  <option disabled={true} selected value="">
                    Select the subject
                  </option>
                  <option  value="Computer Systems">Computer Systems</option>
                  <option  value="Discrete Maths">Discrete Maths</option>
                  <option  value="Biomedische Chemie">Biomedische Chemie</option>
                  <option  value="Biologie">Biologie</option>
                  <option  value="Politieke Geschiedenis">Politieke Geschiedenis</option>
                  <option  value="Statistiek I">Statistiek I</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="">
              <Form.Label>Session information</Form.Label>
              <Col md="5">
                <Form.Control
                  required
                  type="number"
                  placeholder="# Years experience with subject"
                  onChange={(e) => setExp(e.target.value)}
                />
              </Col>
              <Col md="auto">
                <Form.Control
                  required
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  placeholder="Price in €/h"
                />
              </Col>
              <Col md="auto">
                <Form.Check
                  required
                  type="checkbox"
                  label="Free Test-session"
                  className="checkbox"
                  onChange={(e) => setTest(e.target.value)}
                />
              </Col>
            </Row>
            <Form.Label>Session description</Form.Label>

            <Col md="auto">
              <Form.Control
                as="textarea"
                placeholder="Give a description of how to session will be given"
                maxLength={573}
                rows={5}
                required
                onChange={(e) => setDesc(e.target.value)}
              />
            </Col>
            <Row></Row>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col md="auto">Select location / map has to be integrapted</Col>
        </Row>

        <Row className="justify-content-md-center">
          <Button type="submit">Submit</Button>
        </Row>
      </Form>
    </div>
  );
};

export default CreateTutoringSession;
