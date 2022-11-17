import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const PasswordContext = createContext();

export const AuthConfig = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (loginUsername, loginPassword) => {
    console.log("newdya");
    const res = await axios({
      method: "post",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:8800/login",
    })
    console.log("then");
    setCurrentUser(res.data);
  };

  const logout = async () => {
    const res = await axios({
      method: "post",
      withCredentials: true,
      url: "http://localhost:8800/logout",
    })
    console.log("thanki");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <PasswordContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
      {children}
    </PasswordContext.Provider>
  );
};
