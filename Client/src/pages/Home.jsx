import React from "react";
import { Link } from "react-router-dom";
import Welcome from "../components/Welcome";

const Home = () => {
  return (
    <div className="home">
      <link // zorgt voor de layout van de sterren 
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <Welcome/>
    </div>
  );
};

export default Home;
