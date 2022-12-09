import React from "react";
import { FaStar } from "react-icons/fa";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLayoutEffect } from "react";
import { PasswordContext } from "../context/PasswordContext";
import { useContext } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import reviewTypes from "./reviewTypes";

const CreateReview = (props) => {
  const id = props.id;
  const type = props.type;

  const location = useLocation();

  const postId = location.pathname.split("/")[2];

  const colors = {
    ourBlue: "#1e328d",
    ourOrange: "#fc3e03",
  };

  const { currentUser } = useContext(PasswordContext);

  const nrStars = 5;
  const stars = Array(nrStars).fill(0); // lijst van "nrStars" aantal elementen geïnitialiseerd met 0'en
  const [nrHoveredStars, setNrHoveredStars] = React.useState(undefined); // per default werden er nog geen sterren geselecteerd
  const [nrClickedStars, setClickedStars] = React.useState(0); // per default is de rating = 0
  const [title, setTitle] = React.useState(0);
  const [description, setDescription] = React.useState(0);

  const handleMouseClick = (value) => {
    setClickedStars(value);
  };

  const handleMouseOver = (value) => {
    setNrHoveredStars(value);
  };

  const handleMouseLeave = () => {
    setNrHoveredStars(undefined);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "post",
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
        url: `http://localhost:8800/postReviews/`,
        data: {
          title,
          description,
          nrClickedStars,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Row>
        <h1>Rate your experience</h1>
      </Row>
      <Row>
        <div className="stars">
          {stars.map((_, index) => {
            // gaat elk element van de lijst "stars" naar een ster mappen
            return (
              <FaStar
                key={index}
                //size={0.05*screenHeight}
                size={"5vh"}
                style={{
                  marginRight: 10,
                }}
                color={(nrHoveredStars || nrClickedStars) > index ? colors.ourOrange : colors.ourBlue} // indien "index" groter is dan het aantal geselecteerde OF gegeven sterren => kleur de ster horende bij de index in het oranje
                onClick={() => handleMouseClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
              />
            );
          })}
        </div>
      </Row>
      <Col>
        <Row>
          <textarea className="reviewTitle" onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        </Row>
        <Row>
          <textarea onChange={(e) => setDescription(e.target.value)} placeholder="Describe your experience" />
        </Row>
      </Col>
      <Row>
        <button
          onClick={(event) => {
            if (type === reviewTypes.Post) {
              handleSubmit(event);
            } else {
              console.log("nope");
            }
          }}
        >
          Submit
        </button>
      </Row>
    </div>
  );
};

export default CreateReview;
