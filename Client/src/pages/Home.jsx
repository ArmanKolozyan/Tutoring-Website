import React from "react";
import { Link } from "react-router-dom";
import {promotedUsers} from "../constants"

const Home = () => {
  return (
    <div className="home">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="posts">
        {promotedUsers.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/user/${post.id}`}>
                <h1 style={{color: "black"}}>{post.title}</h1>
              </Link>
              <div className="stars">
                <span class="fa fa-star checked fa-2x"></span>
                <span class="fa fa-star checked fa-2x"></span>
                <span class="fa fa-star checked fa-2x"></span>
                <span class="fa fa-star fa-2x"></span>
                <span class="fa fa-star fa-2x"></span>
              </div>
              <p>{post.desc}</p>
              <Link className="link" to={`/user/${post.id}`}>
                <button>Read more</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
