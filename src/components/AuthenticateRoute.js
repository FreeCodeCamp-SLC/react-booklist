import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../auth-context";

export default function AuthenticateRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (user === null) {
          return <Redirect to="/login" />;
        } else {
          return <Component {...routeProps} />;
        }
      }}
    />
  );
}
