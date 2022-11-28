import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const PasswordContext = createContext();
export const AuthConfig = ({ children }) => {
  // the currentUser contains the user info of the logged in user
  // if no user is logged in, it is null
  // this currentUser can be used in the entire application
  // (see <AuthConfig> in index.js)
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );



  const login = async (loginEmail, loginPassword) => {
    const res = await axios({
      method: "post",
      data: {
        email: loginEmail,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:8800/login",
    })
    if (res.data != null) {
      console.log("done");
      console.log(res.data);
    setCurrentUser(res.data);
    }
  };

  const logout = async () => {
    const res = await axios({
      method: "post",
      withCredentials: true,
      url: "http://localhost:8800/logout",
    })
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
