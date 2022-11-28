import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TutoringSessionInfo from "../components/TutoringSessionInfo";
import TutorInfo from "../components/TutorCard";
import TutoringSessionDescription from "../components/TutoringSessionDescription";
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";


const ViewTutoringSession = () => {

  const location = useLocation();

  const [post, setPost] = useState({});

  const postId = location.pathname.split("/")[2];

  console.log("hallo")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/posts/${postId}`,
        })
        console.log(res.data);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);



  return (
    <div className="ViewTutoringSession">
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
          <Row className="justify-content-md-center">

            <div className="TutoringSessionInfo">
              <TutoringSessionInfo
                tutoringSessionName={post.tutoringSession}
                tutoringSessionFac={post.field_of_study}
                tutoringSessionPrice={post.price}
                tutoringSessionFreeTrial={post.free_test==="on" ? true : false}
                Experience={post.experience}
              />
            </div>
            </Row>

            <Row className="justify-content-md-center">
          <Col md="">
            <div className="TutoringSessionDescription">
              <TutoringSessionDescription
              description={post.description}
              />
            </div>
          </Col>
        </Row>
          </Col>

          <Col md="auto">
            <div className="TutorInfo">
              <TutorInfo
                tutorName={post.FirstName}
                tutorText={
                  "This is my personal tutor textje, where I talk a bit about myself :)"
                }
                tutorAge={21}
                AvgRating={3}
                ProfileLink={"http://localhost:3000/Login"}
                PhotoLink={
                  "https://scontent-bru2-1.xx.fbcdn.net/v/t31.18172-1/10945869_121577144882309_2985454743005061280_o.jpg?stp=dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_ohc=sCUmLGT4B-kAX-ilsrj&_nc_ht=scontent-bru2-1.xx&oh=00_AfA-ERGrIuPLDHgn4ZoN7-cKZ622dJ6dkSDyoqEUE2ahRQ&oe=63A43216"
                }
              />
            </div>
          </Col>
        </Row>

        <Row className="justify-content-md-center">

        <Button>
        Contact Tutor
      </Button>
        </Row>

      </Container>
    </div>
  );
};

export default ViewTutoringSession;
