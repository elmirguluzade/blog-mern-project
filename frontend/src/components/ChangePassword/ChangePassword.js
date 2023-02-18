import React from 'react'
import '../Login/Login.css'

const Login = () => {
  const submitForm = (e) => {
    e.preventDefault();
  }


  return (
    <main className='loginContainer'>
      <div className="login">
        <h2>Change Password</h2>
        <form onSubmit={(e) => submitForm(e)}>
          <div className="input">
            <input type="text" id='email'  />
            <label htmlFor="email">New Password</label>
          </div>
          <div className="input">
            <input type="text" id='password' />
            <label htmlFor="password">Confirm password</label>
          </div>
          <button type="submit">Change</button>
        </form>
      </div>
    </main>
  )
}

export default Login