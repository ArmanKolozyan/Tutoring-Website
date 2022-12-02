import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "../style.scss";


const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  // const [field, setField] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      data: {
        firstName: firstName,
        lastName: lastName,
        email: registerEmail,
        password: registerPassword,
        birthDate: birthDate,
        // fieldOfStudy: field,
      },
      url: "http://localhost:8800/register",
    }).then((res) => console.log(res));
  };
  return (
    <div className="RegisterForm">
    <div className="auth">
      <h1>Register</h1>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <input
              required
              type="text"
              placeholder="first name"
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </Col>

          <Col md="auto">
            <input
              required
              type="text"
              placeholder="last name"
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </Col>
        </Row>

        <input
          required
          type="email"
          placeholder="email"
          onChange={(e) => setRegisterEmail(e.target.value)}
        ></input>
        <input
          required
          type="date"
          placeholder="birthdate"
          onChange={(e) => setBirthDate(e.target.value)}
        ></input>
        <input
          required
          type="password"
          placeholder="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        ></input>
        <button type="submit">Register</button>
        <p>Possible error will be shown here!</p>
        <span>Already have an account?</span>
        <Link className="linkStyle" to="/login">
          Login
        </Link>
      </Form>
    </div>
    </div>
  );
};

export default Register;
