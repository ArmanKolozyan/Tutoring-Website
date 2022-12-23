import React from "react";
import { FaStar } from "react-icons/fa";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import {useLocation } from "react-router-dom";
import moment from "moment";
import reviewTypes from "./ReviewTypes";
import {colors} from "../../constants.js"

/**
 * COMPONENT TO WRITE A REVIEW FOR A TUTORING POST
 */
const CreateReview = (props) => {
  const id = props.id;
  const type = props.type; // for generalisation purposes (reviews for multiple types)

  // get the id of the post from the URL
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const nrStars = 5;
  const stars = Array(nrStars).fill(0); // lijst van "nrStars" aantal elementen geïnitialiseerd met 0'en
  const [nrHoveredStars, setNrHoveredStars] = React.useState(undefined); // no star selection at the beginning
  const [nrOfStars, setClickedStars] = React.useState(0); // per default is de rating = 0
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

  // back-end: post the review
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
          nrOfStars,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          id,
        },
      });
      window.location.reload(); // reload page
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <div>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h1>Rate your experience</h1>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
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
                  color={(nrHoveredStars || nrOfStars) > index ? colors.ourOrange : colors.ourBlue} // indien "index" groter is dan het aantal geselecteerde OF gegeven sterren => kleur de ster horende bij de index in het oranje
                  onClick={() => handleMouseClick(index + 1)}
                  onMouseOver={() => handleMouseOver(index + 1)}
                  onMouseLeave={handleMouseLeave}
                />
              );
            })}
          </div>
        </Col>
      </Row>
      <Col>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <textarea className="reviewTitle" onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <textarea onChange={(e) => setDescription(e.target.value)} placeholder="Describe your experience" />
          </Col>
        </Row>
      </Col>
      <Row>
        <button
          onClick={(event) => {
            if (type === reviewTypes.Post) {
              handleSubmit(event);
            } else {
              // here we could support reviews for other type of pages
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
