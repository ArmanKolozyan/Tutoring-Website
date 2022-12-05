import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GroupSessionInfo from "../components/GroupSessionInfo";
import TutorInfo from "../components/TutorCard";
import GroupSessionDescription from "../components/GroupSessionDescription";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ViewGroupSession = () => {
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
          url: `http://localhost:8800/groupposts/${postId}`,
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
          url: `http://localhost:8800/user/${post.userid}`,
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
  function formatDate(input) {
    let date = input.match(/\d+/g),
      day = date[2],
      month = date[1],
      year = date[0].substring(2); // get only two digits

    return day + "/" + month + "/" + year;
  }

  return (
    <div className="ViewGroupSession">
      <Container>
        <Row className="justify-content-md-center">
          <Row className="justify-content-md-center">
            <Col md="auto">
              <h4> {post.title} </h4>
            </Col>
          </Row>
          <Col md="auto">
            <Row className="justify-content-md-center">
              <div className="GroupSessionInfo">
                <GroupSessionInfo
                  limited={post.limited}
                  space={post.max_inscriptions}
                  faculty={post.faculty}
                  course={post.course}
                  free={post.free}
                  price={post.price}
                  dateTime={post.date_time}
                />
              </div>
            </Row>

            <Row className="justify-content-md-center">
              <Col md="">
                <div className="GroupSessionDescription">
                  <GroupSessionDescription description={post.description} />
                </div>
              </Col>
            </Row>
          </Col>

          <Col md="auto">
            <div className="TutorInfo">
              <h6> Organised by: </h6>
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
          <Col md="auto">
            <Button>Inscribe yourself for session!</Button>
          </Col>
          <Col md="auto">OR</Col>
          <Col md="auto">
            <Button>Contact Group session Organisator</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ViewGroupSession;
