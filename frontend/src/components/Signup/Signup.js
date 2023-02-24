/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../Login/Login.css'


const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [data, setData] = useState({})
  const [fetch, setFetch] = useState(false)
  const navigate = useNavigate()

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  useEffect(() => {
    axios.post('http://localhost:4000/user/signup', data)
      .then(() => {navigate('/login')})
      .catch(err => {
        if (err.response.status === 403 || err.response.message === "Email need unique") {
          setMessage("This email was used")
        }
      })
  }, [fetch])

  const submitForm = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setMessage("Please enter all information")
      return;
    }

    const emailFormat = validateEmail(email)
    if (!emailFormat) {
      setMessage("Email is not correct format")
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords are not same")
      return;
    }
    setData({ name, email, password, confirmPassword })
    if (password === confirmPassword) {
      setMessage("")
      setFetch(!fetch)
    }
  }
  return (
    <main className='loginContainer'>
      <div className="login">
        <h2>Sign Up</h2>
        <form onSubmit={(e) => submitForm(e)}>
          <div className="input">
            <input
              className='text'
              type="text"
              id='name'
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder=' ' />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input">
            <input
              className='text'
              type="text"
              id='emailSign'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder=' ' />
            <label htmlFor="emailSign">Email</label>
          </div>
          <div className="input">
            <input
              className='text'
              type="password"
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder=' ' />
            <label htmlFor="password">Password</label>
          </div>
          <div className="input">
            <input
              className='text'
              type="password"
              id='passwordConfirm'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder=' ' />
            <label htmlFor="passwordConfirm">Confirm password</label>
          </div>
          <button type="submit">Sign Up</button>
          {
            message ? <p className="msg">{message}</p> : ''
          }
        </form>
        <p className='notMember'>Already member? <NavLink className={'toSign'} to="/login">Login</NavLink> </p>
      </div>
    </main>
  )
}

export default Signup