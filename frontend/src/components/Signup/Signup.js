import React from 'react'
import '../Login/Login.css'
import { NavLink } from 'react-router-dom'


const Signup = () => {
  const submitForm = (e) => {
    e.preventDefault();
  }


  return (
    <main className='loginContainer'>
      <div className="login">
        <h2>Sign Up</h2>
        <form onSubmit={(e) => submitForm(e)}>
          <div className="input">
            <input type="text" id='name' />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input">
            <input type="text" id='emailSign'/>
            <label htmlFor="emailSign">Email</label>
          </div>
          <div className="input">
            <input type="text" id='password'/>
            <label htmlFor="password">Password</label>
          </div>
          <div className="input">
            <input type="text" id='passwordConfirm'/>
            <label htmlFor="passwordConfirm">Confirm password</label>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p className='notMember'>Already member? <NavLink className={'toSign'} to="/login">Login</NavLink> </p>
      </div>
    </main>
  )
}

export default Signup