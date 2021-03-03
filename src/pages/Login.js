import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth-context";
import useAuthentication from "../utils/useAuthentication";
import useForm from "../utils/useForm";

export default function LoginPage() {
  const { values, updateValue } = useForm({
    email: "",
    password: "",
  });

  const { user } = useContext(AuthContext);

  const { error, loading, submitLogin } = useAuthentication({
    values,
  });

  if (user) {
    return <Redirect to="/dashboard" />;
  }

  function handleClick(e) {
    e.preventDefault();
    submitLogin(values);
  }

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleClick}>
        <fieldset>
          <label htmlFor="email">
            Email
            <input
              type="text"
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
          {error && (
            <div>
              <p>Error: {error}</p>
            </div>
          )}
          <button type="submit" disabled={loading}>
            {loading ? "Loading" : "Login"}
          </button>
        </fieldset>
      </form>
    </div>
  );
}
