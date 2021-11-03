import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function AuthenticateRoute({ children }) {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? children : <Redirect to="/" />;
}
