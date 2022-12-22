import React from "react";
import Row from "react-bootstrap/Row";
import { FaStar } from "react-icons/fa";
import {colors} from "../../constants.js"

/**
 * COMPONENT FOR VIEWING A SINGLE REVIEW 
 * BY PROVIDING AS ARGUMENT THE REVIEW FROM THE DATABASE.
 */
const ViewReview = ({review}) => {
  const stars = Array(5).fill(0);

  return (
    <div className="Review">
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div className="box">
        <Row>
          <h4>{review.title}</h4>
        </Row>
        <Row>
          <div className="stars">
            {stars.map((_, index) => {
              // maps each element of the stars list to a star
              return (
                <FaStar
                  key={index}
                  style={{
                    marginRight: 10,
                  }}
                  color={review.rating > index ? colors.ourOrange : colors.ourBlue} // indien "index" groter is dan het aantal geselecteerde OF gegeven sterren => kleur de ster horende bij de index in het oranje
                />
              );
            })}
          </div>
        </Row>
        <Row>
          <p> {review.description}</p>
        </Row>
        <Row>
          <h2>{review.firstname}</h2>
        </Row>
      </div>
    </div>
  );
};

export default ViewReview;
