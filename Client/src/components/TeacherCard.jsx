import React from "react"
import Logo from "../images/Logo.png"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function TeacherInfo(props) {
  let teacherName = props.teacherName;
  let teacherAge = props.teacherAge;
  let teacherText = props.teacherText;
  let AvgRating = props.AvgRating;
  let ProfileLink = props.ProfileLink;
  let PhotoLink = props.PhotoLink;


  return (
    <div>
    <Card style={{ width: '20rem' }}>
      <Card.Img variant="top" src={PhotoLink} />
      <Card.Body>
        <Card.Title>{teacherName}</Card.Title>
        <Card.Text>
          {teacherText}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Age: {teacherAge} Years</ListGroup.Item>
        <ListGroup.Item>Average Rating: {AvgRating}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href={ProfileLink}>Visit my profile</Card.Link>
      </Card.Body>
    </Card>
    </div>
  )
}

export default TeacherInfo