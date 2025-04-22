import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// import { useHistory } from 'react-router-dom';
import {
  saveAuthToken,
  // loadAuthToken
} from '../utils/local-storage';

export default function AuthPage() {
  // const history = useHistory();
  const {
    // handleRedirectCallback,
    getAccessTokenSilently,
    // user,
    isAuthenticated,
  } = useAuth0();
  console.log('isAuthenticated on Auth page', isAuthenticated);

  // useEffect(async () => {
  //   const getAccessToken = async () => {
  //     try {
  //       await handleRedirectCallback();
  //     } catch (e) {
  //       console.error('There was an error redirecting');
  //     }
  //   };
  //   await getAccessToken();
  // }, []);

  useEffect(async () => {
    const getAccessToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          // authorizationParams: {
          //   audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
          //   scope: 'read:current_user',
          // },
          audience: `https://utahfcc.us.auth0.com/api/v2/`,
          scope: 'read:current_user',
        });
        saveAuthToken(accessToken);
      } catch (e) {
        console.log(e.message);
      }
    };
    await getAccessToken();
    // history.push('/dashboard');
  }, []);

  return (
    <>
      <div className="flex justify-center items-center mt-40">
        <div>Is {!isAuthenticated ? 'NOT' : ''} Authenticated</div>
        {/* <div
          className="spinner-border animate-spin inline-block w-32 h-32 border-8 rounded-full text-booklistBlue-light"
          role="status"
        /> */}
      </div>
    </>
  );
}
