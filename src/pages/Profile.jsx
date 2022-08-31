import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { loadAuthToken } from '../utils/local-storage';
import Header from '../components/Header';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = 'utahfcc.us.auth0.com';
      const accessToken = loadAuthToken();
      try {
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const { userMetadataResponse } = await metadataResponse.json();
        setUserMetadata(userMetadataResponse);
      } catch (e) {
        console.log(e.message);
      }
    };
    getUserMetadata();
  }, []);

  return (
    isAuthenticated && (
      <section className="sm:grid grid-cols-layout grid-rows-layout">
        <Header />
        <section className="p-10 bg-gray-100">
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <h3>User Metadata</h3>
          {userMetadata ? (
            <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
          ) : (
            'No user metadata defined'
          )}
        </section>
      </section>
    )
  );
};

export default Profile;
