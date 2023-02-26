import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  const style = { textAlign: 'center', marginTop: '10px' }

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 2000)
  })

  return (
    <div style={style}>
      <h3>Not Found 404</h3>
    </div>
  )
}

export default NotFound