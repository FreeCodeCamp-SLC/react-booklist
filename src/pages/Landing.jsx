import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import logo from '../images/main-logo-new.png';
import bgImg from '../images/sign-in.jpg';
import LoginButton from '../components/LoginButton';

export default function LandingPage() {
  const { isAuthenticated } = useAuth0();
  React.useEffect(() => {
    if (isAuthenticated) {
      // Redirect to the dashboard or any other page
      window.location.href = '/dashboard';
    }
  });
  return (
    <article className="h-screen md:flex">
      <section className="flex flex-col items-center justify-center w-full px-10 md:w-5/12">
        <div className="flex flex-col items-center w-full mb-10">
          <img className="w-1/3" src={logo} alt="logo" />
          <h1 className="mb-10 text-3xl font-bold text-center text-gray-900 font-inter">
            Track Your Reading
          </h1>
          <hr className="flex-auto w-full border-solid border-booklistRed border-1" />
        </div>
        <LoginButton />
        {/* <div>{JSON.stringify(user)}</div> */}
      </section>
      <aside className="invisible w-7/12 md:visible">
        <img
          src={bgImg}
          alt="books on shelves"
          className="object-cover w-full h-full"
        />
      </aside>
    </article>
  );
}
