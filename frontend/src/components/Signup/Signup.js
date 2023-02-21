import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import '../Login/Login.css'


const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [data, setData] = useState({})

  const submitForm = (e) => {
    e.preventDefault();
    setData({
      name,
      email,
      password,
      confirmPassword
    })
    try {
      axios.post('http://localhost:4000/user/signup', data)
        .then(result => console.log(result))
    } catch (error) {
      console.log(error.message);
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
              type="text"
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder=' ' />
            <label htmlFor="password">Password</label>
          </div>
          <div className="input">
            <input
              className='text'
              type="text"
              id='passwordConfirm'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder=' ' />
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