import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth-context";
import { clearAuthToken } from "../utils/local-storage";

export default function Header() {
  const { user, setUser } = useContext(AuthContext);
  function logout() {
    clearAuthToken();
    setUser(null);
  }
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/tailwind">Tailwind</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <button onClick={logout}>Logout</button>
        </ul>
      </nav>
    </header>
  );
}
