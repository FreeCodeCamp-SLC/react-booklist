import React, { useState } from "react";
import { Route } from "react-router-dom";
import Header from "./Header";
import LandingPage from "../pages/Landing";
import LoginPage from "../pages/Login";
import RegistrationPage from "../pages/Registration";
import DashboardPage from "../pages/Dashboard";
import TestingTailwind from "../Demo/TailwindTest";
import { AuthContext } from "../auth-context";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <Header />
        <main>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegistrationPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/tailwind" component={TestingTailwind} />
        </main>
      </AuthContext.Provider>
    </>
  );
}

export default App;
