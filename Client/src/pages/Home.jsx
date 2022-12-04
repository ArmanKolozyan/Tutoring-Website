import React from "react";
import { Link } from "react-router-dom";
import {promotedUsers} from "../constants"
import Welcome from "../components/Welcome";

const Home = () => {
  return (
    <div className="home">
      <link // zorgt voor de layout van de sterren 
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <Welcome/>
      <div className="promotedPosts">
        {promotedUsers.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt="" />
            </div>
            <div className="content">
              <h1>{post.title}</h1> {/* titel bij de post */}
              <div className="stars">
                <span class="fa fa-star checked fa-2x"></span>
                <span class="fa fa-star checked fa-2x"></span>
                <span class="fa fa-star checked fa-2x"></span>
                <span class="fa fa-star fa-2x"></span>
                <span class="fa fa-star fa-2x"></span>
              </div>
              <p>{post.desc}</p>
              <div className="myButton">
                <Link className="link" to={`/user/${post.id}`}>
                  <button>Visit profile</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
