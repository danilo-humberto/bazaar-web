import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token'),
        login: localStorage.getItem('login'),
        userId: localStorage.getItem('userId')
    });

    const login = (token, login, userId) => {
        localStorage.setItem('token', token);
        localStorage.setItem('login', login);
        localStorage.setItem('userId', userId);
        setAuthState({token, login, userId});
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('login');
        localStorage.removeItem('userId');
        setAuthState({token: null, login: null, userId: null})
    }

    return (
        <AuthContext.Provider value={{authState, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}