import React from "react"
import Logo from "../images/Logo.png"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function TutorInfo(props) {
  let tutorName = props.tutorName;
  let tutorAge = props.tutorAge;
  let tutorText = props.tutorText;
  let AvgRating = props.AvgRating;
  let ProfileLink = props.ProfileLink;
  let PhotoLink = props.PhotoLink;


  return (
    <div>
    <Card style={{ width: '20rem' }}>
      <Card.Img variant="top" src={PhotoLink} />
      <Card.Body>
        <Card.Title>{tutorName}</Card.Title>
        <Card.Text>
          {tutorText}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Age: {tutorAge} Years</ListGroup.Item>
        <ListGroup.Item>Average Rating: {AvgRating}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href={ProfileLink}>Visit my profile</Card.Link>
      </Card.Body>
    </Card>
    </div>
  )
}

export default TutorInfo