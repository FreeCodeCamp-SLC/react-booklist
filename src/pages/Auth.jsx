import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import { saveAuthToken, loadAuthToken } from '../utils/local-storage';

export default function AuthPage() {
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(async () => {
    const getAccessToken = async () => {
      try {
        const retrievedAccessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          scope: 'read:current_user',
        });
        saveAuthToken(retrievedAccessToken);
      } catch (e) {
        console.log(e.message);
      }
    };
    await getAccessToken();
    history.push('/dashboard');
  }, []);

  return (
    <>
      <div className="flex justify-center items-center mt-40">
        <div
          className="spinner-border animate-spin inline-block w-32 h-32 border-8 rounded-full text-booklistBlue-light"
          role="status"
        />
      </div>
    </>
  );
}
