import React from 'react'
import './Login.css'
import { NavLink } from 'react-router-dom'

const Login = () => {
  const submitForm = (e) => {
    e.preventDefault();
  }


  return (
    <main className='loginContainer'>
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={(e) => submitForm(e)}>
          <div className="input">
            <input type="text" id='email'  />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input">
            <input type="password" id='password' />
            <label htmlFor="password">Password</label>
          </div>
          <div className="forget"><NavLink to='/forget' className="forgetPass">Forget password?</NavLink></div>
          <button type="submit">Login</button>
        </form>
        <p className='notMember'>Not a member? <NavLink className={'toSign'} to="/signup">Sign Up </NavLink> </p>
      </div>
    </main>
  )
}

export default Login