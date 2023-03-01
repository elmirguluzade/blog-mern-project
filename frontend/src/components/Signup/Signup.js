/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import '../Login/Login.css'


const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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
      .then(() => {
        toast.success('Redirecting to login page..', { position: "top-right", autoClose: 500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        setTimeout(() => {
          navigate('/login')
        }, 1000)
        })
      .catch(err => {
        if (err.response.data.message === "Email need unique") {
          toast.error('This email was used', { position: "top-right", autoClose: 500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        }
      })
  }, [fetch])

  const submitForm = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please enter all information', { position: "top-right", autoClose: 500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
      return;
    }

    const emailFormat = validateEmail(email)
    if (!emailFormat) {
      toast.error('Email is not correct format', { position: "top-right", autoClose: 500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords are not same', { position: "top-right", autoClose: 500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
      return;
    }
    setData({ name, email, password, confirmPassword })
    if (password === confirmPassword) {
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
            <label htmlFor="name">Username</label>
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
          <button type="submit" className='submitBtn'>Sign Up</button>
        </form>
        <ToastContainer/>
        <p className='notMember'>Already member? <NavLink className={'toSign'} to="/login">Login</NavLink> </p>
      </div>
    </main>
  )
}

export default Signup