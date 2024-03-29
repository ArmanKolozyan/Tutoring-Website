import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PasswordContext } from "../../context/PasswordContext";
import { useContext, useEffect } from "react";

/**
 * COMPONENT FOR THE LOGIN PAGE
 */
const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const { login } = useContext(PasswordContext);
  const { currentUser } = useContext(PasswordContext);
  const { error } = useContext(PasswordContext);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser != null) {
      navigate("/"); // navigate to home page after logging in
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(loginEmail, loginPassword);
  };

  // show possible errors
  useEffect(() => {
    console.log(error);
    if (error !== false) {
      setShowError(true);
    }
  }, [error]);

  return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input required type="text" placeholder="email" onChange={(e) => setLoginEmail(e.target.value)} />
        <input required type="password" placeholder="password" onChange={(e) => setLoginPassword(e.target.value)} />
        <button type="submit">Login</button>
        {showError ? error : ""}
        <span>Don't have an account?</span>
        <Link className="linkStyle" to="/register">
          Register
        </Link>
      </form>
    </div>
  );
};

export default Login;
