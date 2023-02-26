import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import '../Login/Login.css'

const Login = () => {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const navigate = useNavigate()
  const submitForm = (e) => {
    e.preventDefault();
    if (!password || !newPassword) {
      toast.error('Please enter all information', {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (password !== newPassword) {
      toast.error('Passwords are not same', { position: "top-right", autoClose: 500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
      return;
    }
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Token is not valid or expired', { position: "top-right", autoClose: 500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
      return;
    }
    axios.patch(`http://localhost:4000/user/resetPassword/${token}`, {
      password,
      confirmPassword: newPassword
    })
      .then(() => {
        localStorage.removeItem('token')
        toast.success('Password changed!', { position: "top-right", autoClose: 500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        setTimeout(() => {
          navigate("/login")
        }, 1000)
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
          <button type="submit" className='submitBtn'>Confirm</button>
          <ToastContainer />
        </form>
      </div>
    </main>
  )
}

export default Login