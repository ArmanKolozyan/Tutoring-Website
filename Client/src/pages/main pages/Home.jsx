import React from "react";
import Welcome from "../../components/Welcome";

/**
 * COMPONENT FOR THE HOME PAGE (contains the welcome screen)
 */
const Home = () => {
  return (
    <div className="home">
      <link // layout of stars
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <Welcome/>
    </div>
  );
};

export default Home;
