import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

function TutorInfo(props) {
  let tutorName = props.tutorName;
  let tutorAge = props.tutorAge;
  let tutorText = props.tutorText;
  let AvgRating = props.AvgRating;
  let ProfileLink = props.ProfileLink;
  let PhotoLink = props.PhotoLink;

  return (
    <div className="Tutorcard">
      <Card style={{ width: "20rem", padding: "0vh" }}>
        <Card.Img variant="top" src={PhotoLink} />
        <Card.Title style={{ margin: "auto" }}>{tutorName}</Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>{tutorText}</ListGroup.Item>
          <ListGroup.Item>Age: {tutorAge}</ListGroup.Item>
          <ListGroup.Item>Average Rating: {AvgRating}</ListGroup.Item>
        </ListGroup>
        <Link to={ProfileLink} className="btn btn-primary">
          Visit Profile
        </Link>
      </Card>
    </div>
  );
}

export default TutorInfo;
