import React, { useState } from 'react'
import axios from 'axios'
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.css';
import '../Login/Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const submitForm = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter email")
      return;
    }
    axios.post('http://localhost:4000/user/forgetPassword', {
      email
    }).then(() => {
      alertify.success('Email sent')
      setMessage("")
    })
      .catch(err => {
        const msg = err.response.data.message
        if (msg === "User doesn't exist") {
          setMessage("This email doesn't exist")
        }
        console.log(err);
      })
  }



  return (
    <main className='loginContainer'>
      <div className="login">
        <h2>Forget Password</h2>
        <form onSubmit={(e) => submitForm(e)} className="forgetForm">
          <div className="input">
            <input
              type="text"
              id='emailForget'
              className='text'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder=' ' />
            <label htmlFor="emailForget">Email</label>
          </div>
          <button type="submit">Send</button>
          {
            message ? <p className="msg">{message}</p> : ''
          }
        </form>
      </div>
    </main>
  )
}

export default Login