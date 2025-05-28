import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { saveAuthToken } from '../utils/local-storage';

/**
 * Component that silently captures Auth0 token and stores it in localStorage
 * No UI is rendered - this is a utility component
 */
const AuthTokenSaver = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getAndSaveToken = async () => {
      try {
        if (isAuthenticated) {
          // Get token from Auth0
          const token = await getAccessTokenSilently();
          // Save token to localStorage
          saveAuthToken(token);
        }
      } catch (error) {
        console.error('Error getting access token:', error);
      }
    };

    getAndSaveToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  // This component doesn't render anything
  return null;
};

export default AuthTokenSaver;
