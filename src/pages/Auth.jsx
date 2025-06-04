import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { saveAuthToken } from '../utils/local-storage';

export default function AuthPage() {
  const history = useHistory();
  const {
    // handleRedirectCallback,
    getAccessTokenSilently,
    // user,
    // isAuthenticated,
  } = useAuth0();

  React.useEffect(() => {
    const getAccessToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
          scope: 'read:current_user',
        });
        saveAuthToken(accessToken);
      } catch (e) {
        console.error(e.message);
      }
    };
    getAccessToken();
    history.push('/dashboard');
  }, []);

  return (
    <div className="flex justify-center items-center mt-40">
      <div
        className="spinner-border animate-spin inline-block w-32 h-32 border-8 rounded-full text-booklistBlue-light"
        role="status"
      />
    </div>
  );
}
