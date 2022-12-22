import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";


/**
 * INFORMATION ABOUT THE TUTOR THAT IS SHOWN ON EACH POST OF THAT USER
 * The props speak for speak for themselves
 * @returns 
 */
function TutorInfo(props) {
  let tutorName = props.tutorName;
  let tutorAge = props.tutorAge;
  let tutorText = props.tutorText;
  let profileLink = props.profileLink;
  let pictureSrc = props.pictureSrc;
  let tutorID = props.tutorID;
  const [avgRating, setAvgRating] = useState();

  useEffect(() => {
    console.log("ressss")
    const fetchRating = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: "http://localhost:8800/postReviewsRating/",
          params: {
            tutor_id: tutorID,
          },
        });
        console.log("hhalllo")
        setAvgRating(res.data.data);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    if (tutorID !== "undefined") {
      fetchRating();
    }
  }, [tutorID]);

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    console.log(dateString);
    console.log(birthDate);
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
        <Card.Img variant="top" src={pictureSrc} />
        <Card.Title style={{ margin: "auto" }}>{tutorName}</Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>{tutorText}</ListGroup.Item>
          <ListGroup.Item>Age: {tutorAge ? getAge(tutorAge) : ""}</ListGroup.Item>
          <ListGroup.Item>Average Rating: {avgRating}</ListGroup.Item>
        </ListGroup>
        <Link to={profileLink} className="btn btn-primary">
          Visit Profile
        </Link>
      </Card>
    </div>
  );
}

export default TutorInfo;
