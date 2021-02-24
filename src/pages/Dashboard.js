import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth-context";

export default function DashboardPage() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
