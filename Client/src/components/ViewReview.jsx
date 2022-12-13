// ZICH INSPIREREN VAN DE HOME PAGE MAAR ZONDER DE IMAGE EN EEN DUIDELIJK SPLITSING VAN DE VERSCHILLENDE REVIEWS
import React from "react";
import Row from "react-bootstrap/Row";
import { FaStar } from "react-icons/fa";

const ViewReview = ({review}) => {
  const stars = Array(5).fill(0);

  const colors = {
    ourBlue: "#1e328d",
    ourOrange: "#fc3e03",
  };

  return (
    <div className="Review">
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="box">
        <Row>
          <h1>{review.title}</h1>
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
