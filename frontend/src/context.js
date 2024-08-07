import React, { useState } from 'react'

export const userContext = React.createContext({});

const ContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState('')
    const [token, setToken] = useState('')
    const states = { userInfo, setUserInfo, token, setToken }
    return (
        <userContext.Provider value={states}>
            {children}
        </userContext.Provider>
    )
}

export default ContextProvider