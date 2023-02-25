import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../Login/Login.css'

const Login = () => {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const submitForm = (e) => {
    e.preventDefault();
    if (password !== newPassword) {
      setMessage("Passwords are not same")
      return;
    }
    const token = localStorage.getItem('token')
    if (!token) {
      setMessage("Token is not valid or expired")
      return;
    }
    axios.patch(`http://localhost:4000/user/resetPassword/${token}`, {
      password,
      confirmPassword: newPassword
    })
      .then(() => {
        localStorage.removeItem('token')
        setMessage("")
        navigate("/login")
      }).catch(err => console.log(err))
  }


  return (
    <main className='loginContainer'>
      <div className="login">
        <h2>Change Password</h2>
        <form onSubmit={(e) => submitForm(e)} className="resetPassword">
          <div className="input">
            <input
              type="password"
              id='password'
              className='text'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder=' ' />
            <label htmlFor="password">New Password</label>
          </div>
          <div className="input">
            <input type="password" id='newpassword'
              className='text'
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder=' ' />
            <label htmlFor="newpassword">Confirm password</label>
          </div>
          <button type="submit">Confirm</button>
          {
            message ? <p className="msg">{message}</p> : ''
          }
        </form>
      </div>
    </main>
  )
}

export default Login