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

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  // const [field, setField] = useState();
  const { error } = useContext(PasswordContext);
  const [showError, setShowError] = useState(false)

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
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  useEffect(() => {
    console.log(error)
    if (error !== false) {
    setShowError(true)
    }
}, [error]);

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
          {showError ? 
        error
        :
        ""}          <span>Already have an account?</span>
          <Link className="linkStyle" to="/login">
            Login
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
