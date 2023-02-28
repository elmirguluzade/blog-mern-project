/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { userContext } from '../../Context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useLocation } from 'react-router-dom'
import axios from 'axios'
import './Nav.css'

const Nav = () => {
  const location = useLocation()
  const { userInfo, setUserInfo } = useContext(userContext)

  useEffect(() => {
    axios('http://localhost:4000/user/profile', {
      method: "get",
      withCredentials: true
    })
      .then(response => response.data)
      .then(data => setUserInfo(data.id))
  }, [])


  const logout = () => {
    axios('http://localhost:4000/user/logout', {
      method: "get",
      withCredentials: true
    }).then(() => {
      toast.success('Logged Out', { position: "top-right", autoClose: 500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
      setTimeout(() => {
        localStorage.removeItem('name')
        setUserInfo('')
      }, 1000)
    }
    )
  }
  return (
    <header>
      <nav>
        <div className="header-title">
          <NavLink style={{ textDecoration: 'none', color: 'black' }} to="/"><h3>MyBlog</h3></NavLink>
        </div>
        <div className="header-links">
          {userInfo !== '' && location.pathname === "/" && (
            <>
              <span>Welcome, <b>{localStorage.getItem('name')[0].toUpperCase() + localStorage.getItem('name').slice(1)}</b></span>
              <NavLink className={'navLink'} to='/create'>Create new post</NavLink>
              <a href='/' className='navLink' onClick={logout}>Logout</a>
            </>
          )}
          {userInfo === '' &&
            location.pathname !== "/login" &&
            location.pathname !== "/signup" &&
            location.pathname !== "/reset" && (
              <>
                <NavLink className={'navLink'} to='/login'>Login</NavLink>
                <NavLink className={'navLink'} to='/signup'>Sign Up</NavLink>
              </>
            )}
          <ToastContainer />
        </div>
      </nav>
    </header>
  )
}

export default Nav;
