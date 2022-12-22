import React from "react";
import Logo from "../images/Logo.png";


/**
 * THE LOGO OF THE WEBSITE
 */
const Trademark = () => {
  return (
    <div className="trademark">
      <div className="container">
        <div className="logo">
        <a href="/">
          <img href="/" src={Logo} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Trademark;
