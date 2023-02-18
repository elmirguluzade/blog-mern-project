import React from 'react'
import '../Login/Login.css'

const Login = () => {
  const submitForm = (e) => {
    e.preventDefault();
  }


  return (
    <main className='loginContainer'>
      <div className="login">
        <h2>Forget Password</h2>
        <form onSubmit={(e) => submitForm(e)}>
          <div className="input">
            <input type="text" id='emailForget'  />
            <label htmlFor="emailForget">Email</label>
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </main>
  )
}

export default Login