import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'


const PrivateRoutes = () => {
    const token = document.cookie.split("=")[1]
    return (
        token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes