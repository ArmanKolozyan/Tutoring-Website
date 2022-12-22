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

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    console.log(dateString)
    console.log(birthDate)
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

  return (
    <div className="Tutorcard">
      <Card style={{ width: "20rem", padding: "0vh" }}>
        <Card.Img variant="top" src={PhotoLink} />
        <Card.Title style={{ margin: "auto" }}>{tutorName}</Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>{tutorText}</ListGroup.Item>
          <ListGroup.Item>Age: {tutorAge ? getAge(tutorAge) : ""}</ListGroup.Item>
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
