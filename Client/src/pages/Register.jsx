import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "../style.scss";
import { PasswordContext } from "../context/PasswordContext";
import { useContext, useEffect } from "react";

/**
 * COMPONENT FOR THE REGISTER PAGE
 */
const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [message, setMessage] = useState(); // error message
  const [showMessage, setShowMessage] = useState(false);

  // send the information to the back-end to create
  // an account
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios({
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
      });
      setMessage("You are registered!");
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  useEffect(() => {
    if (message !== false) {
      setShowMessage(true);
    }
  }, [message]);

  return (
    // the form
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
              <input required type="text" placeholder="last name" onChange={(e) => setLastName(e.target.value)}></input>
            </Col>
          </Row>
          <input required type="email" placeholder="email" onChange={(e) => setRegisterEmail(e.target.value)}></input>
          <input required type="date" placeholder="birthdate" onChange={(e) => setBirthDate(e.target.value)}></input>
          <input
            required
            type="password"
            placeholder="password"
            onChange={(e) => setRegisterPassword(e.target.value)}
          ></input>
          <button type="submit">Register</button>
          {showMessage ? message : ""} <span>Already have an account?</span>
          <Link className="linkStyle" to="/login">
            Login
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
