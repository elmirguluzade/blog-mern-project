import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Nav.css'

const Nav = () => {
  const location = useLocation()

  return (
    <header>
      <nav>
        <div className="header-title">
          <NavLink style={{textDecoration: 'none', color: 'black'}} to="/"><h3>MyBlog</h3></NavLink>
        </div>
        <div className="header-links">
          {location.pathname === "/login" ? <NavLink className={'navLink'} to='/signup'>Sign Up</NavLink> : ''}
          {location.pathname === "/signup" ? <NavLink className={'navLink'} to='/login'>Login</NavLink> : ''}
          {location.pathname === "/" ?
            <>
              <NavLink className={'navLink'} to='/login'>Login</NavLink>
              <NavLink className={'navLink'} to='/signup'>Sign Up</NavLink>
            </> : ''}
        </div>
      </nav>
    </header>
  )
}

export default Nav;
