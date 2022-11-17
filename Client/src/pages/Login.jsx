import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { PasswordContext } from "../context/PasswordContext";
import { useContext } from "react";



const Login = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);

  const {login} = useContext(PasswordContext);
  const {currentUser} = useContext(PasswordContext);
  const {logout} = useContext(PasswordContext);



  const handleSubmit = (e) => {
    e.preventDefault();
    currentUser ? logout() : login(loginUsername,loginPassword)};

  const getUser = () => {
    axios({
      method: "get",
      withCredentials: true,
      headers: {"Content-Type": "application/json" }, 
      url: "http://localhost:8800/user",
    }).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
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
      {
          currentUser ?       <div>
        <button onClick={(event) => handleSubmit(event)}>Log out</button>
      </div> : ""
        }
    </div>
  );
};

export default Login;
