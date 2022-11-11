import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = () => {
    axios({
      method: "post",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      headers: {"Content-Type": "application/json" }, 
      credentials: "same-origin",
      url: "http://localhost:8800/login",
    });
  };

  const getUser = () => {
    console.log("heyalo");
    axios({
      method: "get",
      withCredentials: true,
      headers: {"Content-Type": "application/json" }, 
      credentials: "same-origin",
      url: "http://localhost:8800/user",
    }).then((res) => {
      console.log("yuhuhuu");
      setData(res.data);
    });
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
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
        <button onClick={handleSubmit}> Login</button>
        <p>Possible error will be shown here!</p>
        <span>Don't have an account?</span>
        <Link className="linkStyle" to="/register">
          Register
        </Link>
      </form>
      <div>
        <h1>Get User</h1>
        <button onClick={getUser}>Submit</button>
        {data ? <h1>Welcome Back {data.username}</h1> : <h1>Nada</h1>}
      </div>
    </div>
  );
};

export default Login;
