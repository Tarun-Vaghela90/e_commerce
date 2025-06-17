import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
   
  };
  const signup = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
   
  };


  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, user, setUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
