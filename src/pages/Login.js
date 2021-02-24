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

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submitLogin}>
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
          <label>
            password
            <input
              type="text"
              name="password"
              id="password"
              value={values.password}
              onChange={updateValue}
              required
            />
          </label>
          <div>{error ? <p>Error: {error}</p> : ""}</div>
          <button type="submit" disabled={loading}>
            {loading ? "Loading" : "Login"}
          </button>{" "}
        </fieldset>
      </form>
    </div>
  );
}
