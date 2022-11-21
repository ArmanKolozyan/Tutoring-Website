import React from 'react'
import { Link } from 'react-router-dom'
import {useState} from 'react'
import axios from "axios";


const Register = () => {
  const [regsiterUsername, setRegsiterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");


  const handleSubmit = () => {
    axios({
      method: "post",
      data: {
        username: regsiterUsername,
        password: registerPassword,
        email: registerEmail,
      },
      url: "http://localhost:8800/register",
    }).then((res) => console.log(res));
  };
  return (
    <div className='auth'>
    <h1>Register</h1>
    <form>
      <input required type="text" placeholder="username" onChange={(e) => setRegsiterUsername(e.target.value)}></input>
      <input required type="email" placeholder="email" onChange={(e) => setRegisterEmail(e.target.value)}></input>
      <input required type="password" placeholder="password" onChange={(e) => setRegisterPassword(e.target.value)}></input>
      <button onClick={handleSubmit}>Register</button>
      <p>Possible error will be shown here!</p>
      <span>Already have an account?</span>
      <Link className="linkStyle" to="/login">Login</Link> 
    </form>
    </div>
  )
}

export default Register