/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'
import { userContext } from '../../Context'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [data, setData] = useState('')
  const [fetch, setFetch] = useState(false)
  const [msg, setMsg] = useState('')
  const didMount = useRef(false)
  const { setUserInfo } = useContext(userContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (didMount.current) {
      axios('http://localhost:4000/user/login', {
        method: "post",
        data,
        withCredentials: true
      })
        .then((response) => response.data)
        .then((data) => {
          setUserInfo(data.user._id)
          navigate('/')
        })
        .catch(err => {
          if (err.response.status === 401 || err.response.message === "Email or password is incorrect") {
            setMsg("Email or password is not correct")
          }
        })
    } else {
      didMount.current = true
    }
  }, [fetch])

  const submitForm = (e) => {
    e.preventDefault();
    setData({ email, password })
    if (!email || !password) {
      setMsg("Please enter all information")
      return
    }
    setFetch(!fetch)
  }

  return (
    <main className='loginContainer'>
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={(e) => submitForm(e)}>
          <div className="input">
            <input
              type="text"
              id='email'
              className='text'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder=' ' />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input">
            <input
              type="password"
              id='password'
              className='text'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder=' ' />
            <label htmlFor="password">Password</label>
          </div>
          <div className="forget"><NavLink to='/forget' className="forgetPass">Forget password?</NavLink></div>
          <button type="submit">Login</button>
          {
            msg ? <p className="msg">{msg}</p> : ''
          }
        </form>
        <p className='notMember'>Not a member? <NavLink className={'toSign'} to="/signup">Sign Up </NavLink> </p>
      </div>
    </main>
  )
}

export default Login