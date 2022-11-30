import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GroupSessionInfo from "../components/GroupSessionInfo";
import TutorInfo from "../components/TutorCard";
import GroupSessionDescription from "../components/GroupSessionDescription";
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";


const ViewGroupSession = () => {

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






  const SessionTitel = "SessionTitel SessionDUmmieie"




  return (
    <div className="ViewGroupSession">
      <Container>
        <Row className="justify-content-md-center">
        <Row className="justify-content-md-center">
        <Col md="auto">
        <h4> {SessionTitel} </h4>
        </Col>
        </Row>
          <Col md="auto">
          <Row className="justify-content-md-center">

            <div className="GroupSessionInfo">
              <GroupSessionInfo
                GroupSessionName={"SessionNaam"}
                GroupSessionFac={"post.field_of_study"}
                GroupSessionPrice={"post.price"}
                GroupSessionFree={false}
                GroupSessionLimited={true}
                GroupSessionSpaces={40}
              />
            </div>
            </Row>

            <Row className="justify-content-md-center">
          <Col md="">
            <div className="GroupSessionDescription">
              <GroupSessionDescription
              description={post.description}
              />
            </div>
          </Col>
        </Row>
          </Col>

          <Col md="auto">
            <div className="TutorInfo">
            <h6> Organised by: </h6>
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
        <Col md="auto">
        <Button>
        Inscribe yourself for session!
      </Button>
      </Col>
      <Col md="auto">
      OR
      </Col>
      <Col md="auto">
        <Button>
        Contact Group session Organisator
      </Button>
      </Col>
        </Row>

      </Container>
    </div>
  );
};

export default ViewGroupSession;
