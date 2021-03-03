import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import AuthenticateRoute from "./AuthenticateRoute";
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
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegistrationPage} />
            <AuthenticateRoute path="/dashboard" component={DashboardPage} />
            <Route path="/tailwind" component={TestingTailwind} />
          </Switch>
        </main>
      </AuthContext.Provider>
    </>
  );
}

export default App;
