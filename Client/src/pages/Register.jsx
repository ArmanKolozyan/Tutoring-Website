import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='auth'>
    <h1>Register</h1>
    <form>
      <input required type="text" placeholder="username"></input>
      <input required type="email" placeholder="email"></input>
      <input required type="password" placeholder="password"></input>
      <button>Register</button>
      <p>Possible error will be shown here!</p>
      <span>Already have an account?</span>
      <Link className="linkStyle" to="/login">Login</Link> 
    </form>
    </div>
  )
}

export default Register