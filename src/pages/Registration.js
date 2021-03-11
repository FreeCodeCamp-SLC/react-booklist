import React, { useContext } from "react";
import useForm from "../utils/useForm";
import { AuthContext } from "../auth-context";
import useAuthentication from "../utils/useAuthentication";
import { Redirect } from "react-router-dom";
import Header from "../components/Header";

export default function RegistrationPage() {
  const { values, updateValue } = useForm({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { user } = useContext(AuthContext);

  const { error, loading, submitRegistration } = useAuthentication({ values });

  if (user) {
    return <Redirect to="dashboard" />;
  }

  return (
    <div className="sm:grid grid-cols-layout">
      <Header />
      <h2>Registration Page</h2>
      <form onSubmit={submitRegistration}>
        <fieldset>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={updateValue}
              required
            />
          </label>
          <label htmlFor="password">
            password
            <input
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={updateValue}
              required
            />
          </label>
          <label htmlFor="confirmPassword">
            Confirm password
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={values.confirmPassword}
              onChange={updateValue}
              required
            />
          </label>
          <div>{error ? <p>Error: {error}</p> : ""}</div>
          <button type="submit" disabled={loading}>
            {loading ? "Registering" : "Register"}
          </button>{" "}
        </fieldset>
      </form>
    </div>
  );
}
