import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { PasswordContext } from "../context/PasswordContext";
import { useContext } from "react";

const Login = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const { login } = useContext(PasswordContext);
  const { currentUser } = useContext(PasswordContext);
  const { logout } = useContext(PasswordContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(loginUsername, loginPassword);
    if (currentUser != null) {
      navigate("/");
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          required
          type="text"
          placeholder="username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p>Possible error will be shown here!</p>
        <span>Don't have an account?</span>
        <Link className="linkStyle" to="/register">
          Register
        </Link>
      </form>
    </div>
  );
};

export default Login;
