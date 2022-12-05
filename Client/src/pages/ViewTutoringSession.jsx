import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TutoringSessionInfo from "../components/TutoringSessionInfo";
import TutorInfo from "../components/TutorCard";
import TutoringSessionDescription from "../components/TutoringSessionDescription";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ViewTutoringSession = () => {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const [post, setPost] = useState({});

  const [user, setUser] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/tutoringposts/${postId}`,
        });
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);


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
  }, [post]);

    // format date to dd/mm/yy using Regular Expressions
    function formatDate (input) {
      let date = input.match(/\d+/g),
      day = date[2],
      month = date[1],
      year = date[0].substring(2); // get only two digits
    
      return day+'/'+month+'/'+year;
    }

  return (
    <div className="ViewTutoringSession">
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Row className="justify-content-md-center">
              <div className="TutoringSessionInfo">
                <TutoringSessionInfo
                  tutoringSessionName={post.course}
                  tutoringSessionFac={post.field_of_study}
                  tutoringSessionPrice={post.price}
                  tutoringSessionFreeTrial={
                    post.free_test === "on" ? true : false
                  }
                  experience={post.experience}
                />
              </div>
            </Row>

            <Row className="justify-content-md-center">
              <Col md="">
                <div className="TutoringSessionDescription">
                  <h6> Some words from the tutor: </h6>
                  <TutoringSessionDescription description={post.description} />
                </div>
              </Col>
            </Row>
          </Col>

          <Col md="auto">
            <div className="TutorInfo">
              <TutorInfo
                tutorName={user?.firstname?.concat(' ').concat(user.lastname)} // VRAAG: kan dit mooier?
                tutorText={user?.shortIntro}
                tutorAge={user.birthDate ? formatDate(user.birthDate) : ""}
                AvgRating={3} // TO DOOO
                ProfileLink={`/viewprofile/${user?.id}`}
                PhotoLink={`../uploads/${user?.img}`}
              />
            </div>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Button>Contact Tutor</Button>
        </Row>
      </Container>
    </div>
  );
};

export default ViewTutoringSession;
