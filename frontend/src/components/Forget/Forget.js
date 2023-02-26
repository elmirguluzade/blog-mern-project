import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Login/Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const submitForm = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter email', { position: "top-right", autoClose: 500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
      return;
    }
    axios.post('http://localhost:4000/user/forgetPassword', {
      email
    }).then((response) => {
      const data = response.data.url.split('/')
      const token = data[data.length - 1]
      localStorage.setItem('token', token);
      toast.success('Email sent!', { position: "top-right", autoClose: 500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });

    })
      .catch(err => {
        const msg = err.response.data.message
        if (msg === "User doesn't exist") {
          toast.error("This email doesn't exist", { position: "top-right", autoClose: 500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
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
          <button type="submit" className='submitBtn'>Send</button>
        </form>
        <ToastContainer />
      </div>
    </main>
  )
}

export default Login