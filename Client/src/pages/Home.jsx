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
      {/*}
      <div className="welcome">
        <div class="row">
          <div class="col-12">
            <h1>Welcome to ASA Tutoring</h1>
            <h5></h5>
          </div>
        </div>
      </div>
      */}
      <div className="posts">
        {promotedUsers.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/user/${post.id}`}>
                <h1 style={{color: "black"}}>{post.title}</h1> {/* titel bij de post */}
              </Link>
              <div className="stars">
                <span class="fa fa-star checked fa-2x"></span> {/* geselecteerde/gele ster */}
                <span class="fa fa-star checked fa-2x"></span>
                <span class="fa fa-star checked fa-2x"></span>
                <span class="fa fa-star fa-2x"></span> {/* niet-geselecteerde/zwarte ster */}
                <span class="fa fa-star fa-2x"></span>
              </div>
              <p>{post.desc}</p> {/* tekst bij de post */}
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
