import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TutoringPostInfo from "../../components/tutoring posts/TutoringPostInfo";
import TutorInfo from "../../components/author/CreatorCard";
import TutoringPostDescription from "../../components/tutoring posts/TutoringPostDescription";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link, useNavigate } from "react-router-dom";
import CreateReview from "../../components/reviews/CreateReview";
import reviewTypes from "../../components/reviews/ReviewTypes";
import ViewReviews from "../../components/reviews/ViewReviews";
import { ViewMap } from "../../components/map/ViewMap";
import { useContext } from "react";
import { PasswordContext } from "../../context/PasswordContext";

import Modal from "react-bootstrap/Modal";

/**
 * COMPONENT FOR VIEWING A TUTORING POST
 */
const ViewTutoringPost = () => {
  //contact popup
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const phonenumber = "+32 423 32 34 54";
  function copyPhonenumber() {
    navigator.clipboard.writeText(phonenumber);
  }
  function copyEmail() {
    navigator.clipboard.writeText(user.email);
  }

  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});

  // delete popup
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const { currentUser } = useContext(PasswordContext);

  // get the post from back-end
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

  // get the author of the post
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/users/${post.uid}`,
        });
        setUser(res.data.data);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    if (post) {
      fetchData();
    }
  }, [post]);

  // delete from back-end
  const deletePost = async () => {
    try {
      await axios({
        method: "delete",
        withCredentials: true,
        url: `http://localhost:8800/tutoringposts/${post.id}`,
      });
      navigate("/tutoringposts");
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <div className="ViewTutoringPost">
      <Container>
        {/* Practical information */}
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Row className="justify-content-md-center">
              <div className="TutoringPostInfo">
                <TutoringPostInfo
                  title={post.course}
                  faculty={post.field_of_study}
                  price={post.price}
                  freeTrial={post.free_test === 1 ? true : false}
                  experience={post.experience}
                />
              </div>
            </Row>

            {/* Description of the post */}

            <Row className="justify-content-md-center">
              <Col md="">
                <div className="TutoringPostDescription">
                  <h6> Some words from the tutor: </h6>
                  <TutoringPostDescription description={post.description} />
                </div>
              </Col>
            </Row>
          </Col>

          {/* Organisator information */}

          <Col md="auto">
            <div className="TutorInfo">
              <TutorInfo
                tutorName={user?.firstname?.concat(" ").concat(user.lastname)} // VRAAG: kan dit mooier?
                tutorText={user?.shortIntro}
                tutorAge={user?.birthDate ? user.birthDate : ""}
                profileLink={`/viewprofile/${user?.id}`}
                pictureSrc={`../uploads/${user?.img}`}
                tutorID={user?.id}
              />
              {currentUser.id === post.uid && (
                <>
                  <div className="edit">
                    <Link to={`/createtutoringpost?edit=${post.id}`} state={post} className="btn btn-secondary">
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

        {/* The map */}

        <Row className="justify-content-md-center">
          <ViewMap post_id={post.id} />
        </Row>

        <Row className="justify-content-md-center">
          <Col>
            <Button onClick={handleShow}>Contact Tutor</Button>
          </Col>
        </Row>

        {/* The reviews: creating and viewing */}

        <Row className="justify-content-md-center">
          <Col md="auto">
            {post.uid !== currentUser.id ? (
              <div className="create-review">
                <CreateReview id={postId} type={reviewTypes.Post} />
              </div>
            ) : (
              ""
            )}
            <div className="reviews-list">
              <ViewReviews id={postId} />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Contact the organisator */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact information of the tutor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>His/Her phonenumber is : {phonenumber}</p>
          <Button variant="secondary" onClick={copyPhonenumber}>
            Copy phonenumber
          </Button>

          <p>
            {" "}
            <br />
            His/her Email adress is : {user?.email}
          </p>
          <Button variant="secondary" onClick={copyEmail}>
            Copy email
          </Button>
        </Modal.Body>
      </Modal>

      {/* Delete warning popup */}

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are deleting your post! Are you sure you want to do this, this action can not be undone.
        </Modal.Body>
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

export default ViewTutoringPost;
