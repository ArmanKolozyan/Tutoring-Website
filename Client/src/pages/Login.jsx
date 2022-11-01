import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='auth'>
    <h1>Login</h1>
    <form>
      <input required type="text" placeholder="username" ></input>
      <input required type="password" placeholder="password" ></input>
      <button> Login</button>
      <p>Possible error will be shown here!</p>
      <span> Don't have an account? <Link to= "/register">Register </Link></span>  
    </form>
    </div>
  )
}

export default Login