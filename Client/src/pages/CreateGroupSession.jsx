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
import TutorMap from "../components/TutorMap";

const CreateGroupSession = () => {
  const [title, setTitle] = useState();
  const [limited, setLimited] = useState(false);
  const [space, setSpace] = useState();
  const [faculty, setFaculty] = useState();
  const [course, setCourse] = useState();
  const [price, setPrice] = useState();
  const [free, setFree] = useState(true);
  const [dateAndTime, setDateAndTime] = useState();
  const [desc, setDesc] = useState();

  const { currentUser } = useContext(PasswordContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      axios({
        method: "post",
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
        url: "http://localhost:8800/groupposts/",
        data: {
          title,
          limited,
          space,
          faculty,
          course,
          price,
          free,
          dateAndTime,
          desc,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const checkLimited = () => {
    if (limited) {
      return false;
    } else {
      return true;
    }
  };

  const checkFree = () => {
    if (free) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="create-tutoring-session">
      <Form onSubmit={(event) => handleSubmit(event)}>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Row className="">
              <Col md="auto">
                <h3> Create a group session </h3>
              </Col>
            </Row>

            <Row className="">
              <Col md="5">
                <Form.Control type="text" required placeholder="Session Title" onChange={(e) => setTitle(e.target.value)} />
              </Col>

              <Col md="auto">
                <Form.Check type="checkbox" label="Limited spaces" className="checkbox" onChange={(e) => setLimited(e.target.checked)} />
              </Col>
              <Col md="4">
                <Form.Control required type="number" placeholder="Max inscriptions" disabled={checkLimited()} onChange={(e) => setSpace(e.target.value)} />
              </Col>
            </Row>

            <Row className="">
              <Form.Label>Target audience</Form.Label>
              <Col md="auto">
                <Form.Select required onChange={(e) => setFaculty(e.target.value)}>
                  <option disabled={true} selected value="">
                    Select the faculty of the course
                  </option>
                  <option value="Science and Bio-engineering Sciences">Science and Bio-engineering Sciences</option>
                  <option value="Medicine and Pharmacy">Medicine and Pharmacy</option>
                  <option value="Law and Criminology">Law and Criminology</option>
                </Form.Select>
              </Col>

              <Col md="auto">
                <Form.Select required onChange={(e) => setCourse(e.target.value)}>
                  <option disabled={true} selected value="">
                    Select the course
                  </option>
                  <option value="Computer Systems">Computer Systems</option>
                  <option value="Discrete Maths">Discrete Maths</option>
                  <option value="Biomedische Chemie">Biomedische Chemie</option>
                  <option value="Biologie">Biologie</option>
                  <option value="Politieke Geschiedenis">Politieke Geschiedenis</option>
                  <option value="Statistiek I">Statistiek I</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="">
              <Form.Label>Session information</Form.Label>
              <Col md="auto">
                <Form.Check defaultChecked={true} type="checkbox" label="Free groupsession" className="checkbox" onChange={(e) => setFree(e.target.checked)} />
              </Col>
              <Col md="5">
                <Form.Control style={{"width": "10vw"}} required onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Price" disabled = {checkFree()} />
              </Col>
              <Col md="auto">
                <Form.Label> Date and time: </Form.Label>
                <input required type="datetime-local" id="birthdaytime" name="birthdaytime" onChange={(e) => setDateAndTime(e.target.value)} />
              </Col>
            </Row>
            <Form.Label>Session description</Form.Label>

            <Col md="auto">
              <Form.Control as="textarea" placeholder="Give a description of what this groupsession will be like" maxLength={573} rows={5} required onChange={(e) => setDesc(e.target.value)} />
            </Col>
            <Row></Row>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col md="auto">Draw the regions where you can teach</Col>
        </Row>
        <TutorMap/>

        <Row className="justify-content-md-center">
          <Button type="submit">Submit</Button>
        </Row>
      </Form>
    </div>
  );
};

export default CreateGroupSession;
