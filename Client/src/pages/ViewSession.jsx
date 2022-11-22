import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SessionInfo from "../components/SessionInfo";
import TutorInfo from "../components/TutorCard";
import SessionDescription from "../components/SessionDescription";
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";


const ViewSession = () => {

  const location = useLocation();

  const [post, setPost] = useState({});

  const postId = location.pathname.split("/")[2];

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
    <div className="ViewSession">
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
          <Row className="justify-content-md-center">

            <div className="SessionInfo">
              <SessionInfo
                sessionName={post.course}
                sessionFac={post.field_of_study}
                sessionPrice={post.price}
                sessionFreeTrial={post.free_test==="on" ? true : false}
                Experience={post.experience}
              />
            </div>
            </Row>

            <Row className="justify-content-md-center">
          <Col md="">
            <div className="SessionDescription">
              <SessionDescription
              description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"}
              />
            </div>
          </Col>
        </Row>
          </Col>

          <Col md="auto">
            <div className="TutorInfo">
              <TutorInfo
                tutorName={post.username}
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

export default ViewSession;
