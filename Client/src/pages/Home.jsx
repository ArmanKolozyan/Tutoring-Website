import React from "react";
import Logo from "../images/Logo.png"
import { Link } from "react-router-dom";
import {promotedUsers} from "../constants"

const Home = () => {
  return (
    <div className="home">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="welcome">
        <hr/>
        <div className="logo">
          <img src={Logo} alt=""/>
        </div>
        <div className="title">
          <p>Welcome</p>
        </div>
        <div className="subtitle">
          <p>to ASA Tutoring</p>
        </div>
        <div className="introduction">
          <div class="row mt-3">
            <div class="col-xl-4 mx-auto mb-1">
              <p>
                ASA Tutoring is a webservice created by 3 students of the Computer Science branch at the Vrije Universiteit Brussel.
                The webservice was founded with the purpose of assisting VUB students in their studies.
              </p>
            </div>
            <div class="col-xl-4 mx-auto mb-1">
              <p>
                Students can search for tutoring sessions on subjects they are struggling with.
                They can also create group sessions with other students to discuss subject matters or study together.
                And much more!
              </p>
            </div>
          </div>
        </div>
      </div>
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
