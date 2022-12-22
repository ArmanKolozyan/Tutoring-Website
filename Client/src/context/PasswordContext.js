import { createContext, useEffect, useState } from "react";
import axios from "axios";

/**
 * THIS CONTENT PROVIDES ALL THE AUTHENTICATION FUNCTIONS
 * AND THE DATA OF THE LOGGED IN USER.
 */
export const PasswordContext = createContext();

export const AuthConfig = ({ children }) => {
  // the currentUser contains the user info of the logged in user
  // if no user is logged in, it is null
  // this currentUser can be used in the entire application
  // (see <AuthConfig> in index.js)
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  // possible error to show during login...
  const [error, setError] = useState(false);

  const login = async (loginEmail, loginPassword) => {
    try {
      const res = await axios({
        method: "post",
        data: {
          email: loginEmail,
          password: loginPassword,
        },
        withCredentials: true,
        url: "http://localhost:8800/login",
      });
      if (res.data.data != null) {
        setCurrentUser(res.data.data);
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const logout = async () => {
    try {
      const res = await axios({
        method: "post",
        withCredentials: true,
        url: "http://localhost:8800/logout",
      });
      setCurrentUser(null);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  // update the local storage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <PasswordContext.Provider value={{ currentUser, setCurrentUser, login, logout, error }}>
      {children}
    </PasswordContext.Provider>
  );
};
