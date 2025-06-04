import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }
  return (
    <button
      type="submit"
      onClick={() =>
        loginWithRedirect({
          appState: { targetUrl: '/dashboard' },
        })
      }
      className="w-full py-2 text-white rounded-md bg-booklistBlue-light hover:bg-booklistBlue "
    >
      Sign in or create an account
    </button>
  );
};

export default LoginButton;
