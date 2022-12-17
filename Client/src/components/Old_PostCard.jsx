import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const TutoringCard = ({ post }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/user/${post.uid}`,
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (post) {
      fetchData();
    }
  }, []);

  return (
    <div className="post" key={post.id}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="pic_caption">
        <div className="img">
          <img
            style={{ width: "50vh", height: "auto" }}
            src={`../uploads/${user?.img}`}
            key={user.img}
            // VRAAG: als ik bovenste weghaal, worden de images niet weergegeven
            // (src wordt niet geüpdated ook al is user veranderd), hoe komt dit???
            alt=""
          />
          <div className="caption">
            <p>
              <b>{user?.firstname?.concat(" ").concat(user?.lastname)} </b>
            </p>
            <div
              className="stars"
              style={{ "margin-top": "-5em", "font-size": "5vh" }}
            >
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <Link className="link" to={`/tutoringsession/${post.id}`}>
          <h1 style={{ color: "black" }}>{post.course}</h1>
        </Link>
        <p>{post.description}</p>
        <div className="myButton">
          <Link className="link" to={`/tutoringsession/${post.id}`}>
            <button>Visit post</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutoringCard;
