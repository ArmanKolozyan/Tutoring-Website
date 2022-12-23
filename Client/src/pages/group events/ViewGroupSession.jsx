import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GroupSessionInfo from "../../components/group events/GroupSessionInfo";
import TutorInfo from "../../components/author/CreatorCard";
import GroupSessionDescription from "../../components/group events/GroupSessionDescription";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { useContext } from "react";
import { PasswordContext } from "../../context/PasswordContext";
import { atcb_action, atcb_init } from "add-to-calendar-button";
import "add-to-calendar-button/assets/css/atcb.css";

/**
 * COMPONENT FOR VIEWING A GROUP SESSION
 */
const ViewGroupSession = () => {
  //contact popup
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function copyEmail() {
    navigator.clipboard.writeText(user?.email);
  }

  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});

  const { currentUser } = useContext(PasswordContext);

  // delete popup
  const [showDelete, setShowDelete] = useState(false);

  const [signUp, setSignUp] = useState(false); // register for the event

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const [action, setAction] = useState(false); // pressed on 'register' => update the back-end
  const [count, setCount] = useState(""); // amount of students that have already registered
  const [updatedBackEnd, setUpdatedBackEnd] = useState(false); // back-end is updated, so we can ask the back-end for new registrations number
  const [cantRegisterForOwnEvent, setCantRegisterForOwnEvent] = useState("");

  // get the group post
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/groupposts/${postId}`,
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
      // get the author
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/users/${post.userid}`,
        });
        setUser(res.data.data);
      } catch (err) {
        console.log(err.response.data.message);
      }
      // check whether current user is signed up for this event
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/groupposts/registrations/isSignedUp`,
          params: {
            student_id: currentUser.id,
            post_id: post.id,
          },
        });
        setSignUp(res.data.data);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    if (post && post.id) {
      fetchData();
    }
  }, [post, signUp]);

  // get number of registrations for this event
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/groupposts/registrations/count`,
          params: {
            post_id: post.id,
          },
        });
        setCount(res.data.data);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    if (post && post.id && (!action || updatedBackEnd)) {
      fetchData();
      setUpdatedBackEnd(false);
    }
  }, [post, signUp, updatedBackEnd]);

  // format the date of the event to a format
  // that is supported by the calendars
  function formatDateForCalendar(input) {
    let date = input.match(/\d+/g),
      day = date[2],
      month = date[1],
      year = date[0]; // get only two digits

    return year + "-" + month + "-" + day;
  }

  // delete from back-end
  const deletePost = async () => {
    try {
      await axios({
        method: "delete",
        withCredentials: true,
        url: `http://localhost:8800/groupposts/${post.id}`,
      });
      navigate("/groupposts");
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  // update the registration state of the current user for the event
  useEffect(() => {
    const updateSignUp = () => {
      try {
        axios({
          method: "post",
          withCredentials: true,
          url: "http://localhost:8800/groupposts/registrations",
          data: {
            student_id: currentUser.id,
            post_id: post.id,
            signup: signUp,
          },
        });
        setUpdatedBackEnd(true);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    if (action) {
      updateSignUp();
    }
  }, [signUp, action]);

  // for the add to calendar button
  useEffect(() => {
    atcb_init();
  }, []);

  // for the add to calendar button
  const showCalendarOptions = () => {
    atcb_action({
      name: post.title,
      startDate: formatDateForCalendar(post.date_time),
      startTime: post.date_time.slice(11, 16),
      endTime: post.date_time.slice(11, 16),
      description: post.description,
      options: ["Outlook.com", "Google", "Apple", "Microsoft365"],
      location: post.location,
      timeZone: "Europe/Berlin",
      iCalFileName: "Reminder-Event",
    });
  };

  return (
    <div className="ViewGroupPost">
      <Container>
        {/* Practical information */}
        <Row className="justify-content-md-center">
          <Row className="justify-content-md-center">
            <Col md="auto">
              <h4> {post.title} </h4>
            </Col>
          </Row>
          <Col md="auto">
            <Row className="justify-content-md-center">
              <div className="GroupPostInfo">
                <GroupSessionInfo
                  limited={post.limited === 1 ? true : false}
                  space={post.max_inscriptions}
                  faculty={post.faculty}
                  course={post.course}
                  free={post.free === 1 ? true : false}
                  price={post.price}
                  dateTime={post.date_time}
                  location={post.location}
                  spotsTaken={count}
                />
              </div>
            </Row>

            {/* Description of the event */}

            <Row className="justify-content-md-center">
              <Col>
                <div className="GroupPostDescription">
                  <GroupSessionDescription description={post.description} />
                </div>
              </Col>
            </Row>

            {/* add to calendar button */}
            <Row className="justify-content-md-center">
              <Col md="auto">
                <Button onClick={showCalendarOptions} style={{ width: "20vw", "margin-bottom": "5vw" }}>
                  {" "}
                  Add to calendar{" "}
                </Button>
              </Col>
            </Row>
          </Col>

          {/* Organisator information */}

          <Col md="auto">
            <div className="TutorInfo">
              <h6> Organised by: </h6>
              <TutorInfo
                tutorName={user?.firstname?.concat(" ").concat(user.lastname)} // VRAAG: kan dit mooier?
                tutorText={user?.shortIntro}
                tutorAge={user?.birthDate ? user.birthDate : ""}
                profileLink={`/viewprofile/${user?.id}`}
                pictureSrc={`../uploads/${user?.img}`}
                tutorID={user?.id}
              />
              {currentUser.id === post.userid && (
                <>
                  <div className="edit">
                    <Link to={`/creategrouppost?edit=${post.id}`} state={post} className="btn btn-secondary">
                      Edit Post
                    </Link>
                  </div>
                  <div className="delete">
                    <Link onClick={handleShowDelete} className="btn btn-danger">
                      Delete post
                    </Link>
                  </div>{" "}
                </>
              )}
            </div>
          </Col>
        </Row>

        {/* Registering for the event */}

        <Row className="justify-content-md-center">
          <Col md="auto">
            {post.limited === 1 ? (
              <Button
                onClick={() => {
                  if (user.id === currentUser.id) {
                    // you can't sign up for your own event
                    setCantRegisterForOwnEvent("You can't register for your own event.");
                  } else {
                    setAction(true);
                    setSignUp(!signUp);
                  }
                }}
              >
                {" "}
                {signUp ? "Unsubscribe for this study session" : "Sign up for this study session"}
              </Button>
            ) : (
              ""
            )}
            <Row> {cantRegisterForOwnEvent}</Row>
          </Col>
          {post.limited === 1 ?
          <Col md="auto">OR</Col> :
          ""}
          <Col md="auto">
            <Button onClick={handleShow}>Contact Group session Organisator</Button>
          </Col>
        </Row>
      </Container>

      {/* Contact the organisator */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact information of the tutor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>His/her Email adress is : {user?.email}</p>
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
          You are deleting your post! Are you sure you want to do this? This action can not be undone.
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

export default ViewGroupSession;
