import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "../../style.scss";
import { PasswordContext } from "../../context/PasswordContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";


/**
 * COMPONENT FOR THE REGISTER PAGE
 */
const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [message, setMessage] = useState(""); // error message

  const [successful, setSuccessful] = useState(false); // to automatically sign in when succesfully registered
  const { login } = useContext(PasswordContext); // to automatically sign in when succesfully registered
  const { currentUser } = useContext(PasswordContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser != null) {
      navigate("/"); // navigate to home page after logging in
    }
  }, [currentUser]);

  useEffect(() => {
    if (successful) {
      login(registerEmail, registerPassword);
    }
  }, [successful]);

  // send the information to the back-end to create
  // an account
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "post",
        headers: { "Content-Type": "application/json" },
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
      setSuccessful(true);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

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
          {message.length !== 0 ? message : ""} <span>Already have an account?</span>
          <Link className="linkStyle" to="/login">
            Login
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
