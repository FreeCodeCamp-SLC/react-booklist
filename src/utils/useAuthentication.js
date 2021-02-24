import { useContext, useState } from "react";
import jwtDecode from "jwt-decode";
import { AuthContext } from "../auth-context";
import { API_BASE_URL } from "../config";
import { saveAuthToken, clearAuthToken } from "../local-storage";

const storeAuthInfo = (accessToken) => {
  // const decodedToken = jwtDecode(accessToken);
  saveAuthToken(accessToken);
};

export default function useAuthentication({ values }) {
  const { user, setUser } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submitLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    await fetch(`${API_BASE_URL}/authentication`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        strategy: "local",
        email: values.email,
        password: values.password,
      }),
    })
      .then((res) => res.json())
      .then(({ accessToken, user }) => {
        storeAuthInfo(accessToken);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function submitRegistration(e) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
      });

    await fetch(`${API_BASE_URL}/authentication`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        strategy: "local",
        email: values.email,
        password: values.password,
      }),
    })
      .then((res) => res.json())
      .then(({ accessToken, user }) => {
        storeAuthInfo(accessToken);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return {
    error,
    loading,
    submitLogin,
    submitRegistration,
  };
}

// export const logout = async () => {
//   return {
//     id: null,
//     username: null,
//     email: null,
//   };
// };
