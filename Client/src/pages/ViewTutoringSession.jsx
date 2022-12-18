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
import { useLocation, Link, useNavigate } from "react-router-dom";
import CreateReview from "../components/CreateReview";
import reviewTypes from "../components/reviewTypes";
import ViewReviews from "../components/ViewReviews";
import { ViewMap } from "../components/ViewMap";
import { useContext } from "react";
import { PasswordContext } from "../context/PasswordContext";

import Modal from 'react-bootstrap/Modal';


const ViewTutoringSession = () => {


  //contact popup
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const phonenumber = "+32 423 32 34 54"
  const email = "Stoffel@hotmail.be"

  function copyPhonenumber(){
    navigator.clipboard.writeText(phonenumber);
  }

  
  function copyEmail(){
    navigator.clipboard.writeText(email);
  }
  //



  //// delete popup


  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);


  //


  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const [post, setPost] = useState({});

  const [user, setUser] = useState({});

  const { currentUser } = useContext(PasswordContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/tutoringposts/${postId}`,
        });
        setPost(res.data.data);
      } catch (err) {
        console.log(err.response.data.message);
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
  function formatDate(input) {
    let date = input.match(/\d+/g),
      day = date[2],
      month = date[1],
      year = date[0].substring(2); // get only two digits

    return day + "/" + month + "/" + year;
  }

  const deletePost = async () => {
    try {
      await axios({
        method: "delete",
        withCredentials: true,
        url: `http://localhost:8800/tutoringposts/${post.id}`,
      });
      navigate("/tutoringsessions")
    } catch (err) {
      console.log(err.response.data.message);
    }
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
                  tutoringSessionFreeTrial={post.free_test === 1 ? true : false}
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
                tutorName={user?.firstname?.concat(" ").concat(user.lastname)} // VRAAG: kan dit mooier?
                tutorText={user?.shortIntro}
                tutorAge={user.birthDate ? formatDate(user.birthDate) : ""}
                AvgRating={3} // TO DOOO
                ProfileLink={`/viewprofile/${user?.id}`}
                PhotoLink={`../uploads/${user?.img}`}
              />
              {currentUser.id === post.uid && (
                <>
                  <div className="edit">
                    <Link to={`/createtutoringsession?edit=${post.id}`} state={post} className="btn btn-secondary">
                      Edit Post
                    </Link>
                  </div>
                  <div className="delete">
                    <Link onClick={handleShowDelete} className="btn btn-danger">
                      Delete post
                    </Link>
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <ViewMap post_id={post.id} />
        </Row>

        <Row className="justify-content-md-center">
        <Col>
          <Button onClick={handleShow}>Contact Tutor</Button>
        </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col md="auto">
            <div className="create-review">
              <CreateReview id={postId} type={reviewTypes.Post} />
            </div>
            <div className="reviews-list">
              <ViewReviews id={postId} />
            </div>
          </Col>
        </Row>
      </Container>








      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact information of the tutor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        
        <p>
          His/Her phonenumber is : {phonenumber}
        </p>
        <Button variant="secondary" onClick={copyPhonenumber}>
        Copy phonenumber
        </Button>
        
        <p>        <br/>
          His/her Email adress is : {email}
        </p>
        <Button variant="secondary" onClick={copyEmail}>
        Copy email
        </Button>

        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are deleting your post! Are you sure you want to do this, this action can not be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deletePost}>
            Delete!
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default ViewTutoringSession;
