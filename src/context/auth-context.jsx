import { createContext, useContext, useState } from 'react';
import { loadAuthToken } from '../utils/local-storage';

const authToken = loadAuthToken();
// Will be using this to automatically load returning users in if a valid JWT Token is found in local storage. Back end needs work first though. Need to be able to log a user in w/ just the JWT Token.

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(() => !!authToken);

  return (
    <AuthContext.Provider value={[isAuthenticated, setAuthenticated]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthenticated = () => {
  const [isAuthenticated, setAuthenticated] = useContext(AuthContext);

  return { isAuthenticated, setAuthenticated };
};
