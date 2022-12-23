import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../style.scss";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * COMPONENT FOR CREATING A GROUP SESSION
 */
const CreateGroupSession = () => {
  // if we are updating an exisiting post,
  // the state (the post itself) will be sent
  // when redirected to this page. (see ViewGroupSession)
  const post = useLocation().state;

  const navigate = useNavigate();

  // making human readable date and hours from the DATETIME object that
  // sent from the back-end
  const postDate = () => {
    if (post !== null) {
      const d = new Date(post.date_time);
      const result =
        [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("-") +
        "T" +
        [post.date_time.slice(11, 13), d.getMinutes()].join(":");
      // last slice is needed, otherwise problem when hour starts with 0 (date not showing when editing)
      return result;
    } else {
      return false;
    }
  };

  const [title, setTitle] = useState(post?.title || "");
  const [limited, setLimited] = useState(post?.limited || true);
  const [space, setSpace] = useState(post?.max_inscriptions || "");
  const [faculty, setFaculty] = useState(post?.faculty || "");
  const [course, setCourse] = useState(post?.course || "");
  const [price, setPrice] = useState(post?.price || "");
  const [free, setFree] = useState(post?.free || 0);
  const [dateAndTime, setDateAndTime] = useState(post ? postDate() : "");
  const [desc, setDesc] = useState(post?.description || "");
  const [location, setLocation] = useState(post?.location || "");
  const [picture, setPicture] = useState("");
  const [dateWarning, setDateWarning] = useState("");
  const [message, setMessage] = useState(""); // to display error messages

  // sending the data to back-end for update or insert
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (post) {
        // if new post, insert
        const postId = await axios({
          method: "put",
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
          url: `http://localhost:8800/groupposts/${post.id}`,
          data: {
            title,
            limited,
            space,
            faculty,
            course,
            price,
            free,
            dateAndTime,
            desc,
            location,
          },
        });
        navigate(`/grouppost/${postId.data.data}`);
      } else {
        const postId = await axios({
          // if exiting post, update
          method: "post",
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
          url: "http://localhost:8800/groupposts/",
          data: {
            title,
            limited,
            space,
            faculty,
            course,
            price,
            free,
            dateAndTime,
            desc,
            location,
          },
        });
        navigate(`/grouppost/${postId.data.data}`);
      }
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  // is the session with limited space? 1 => true, otherwise 0
  const checkLimited = () => {
    if (limited == "1") {
      return true;
    } else {
      return false;
    }
  };

  // is the session free? 1 => true, otherwise 0
  const checkFree = () => {
    if (free == 1) {
      return true;
    } else {
      return false;
    }
  };

  // WEB SERVICE 
  // If the selected date is a holiday, you get a warning.
  const handleDate = (dateTime) => {
    setDateAndTime(dateTime);
    const date_time = new Date(dateTime);
    axios
      .get(
        `https://holidays.abstractapi.com/v1/?api_key=d72dfeacf5a44e0a94877c4e0eef05db&country=BE&year=${date_time.getFullYear()}&month=${
          date_time.getMonth() + 1
        }&day=${date_time.getDate()}`
      )
      .then((response) => {
        const result = response.data;
        if (result.length > 0) {
          setDateWarning(`Attention: This is a national holiday (${result[0].name}) `);
        } else {
          setDateWarning("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    // form to fill in all the necessary information
    <div className="create-tutoring-post">
      <Form onSubmit={(event) => handleSubmit(event)}>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Row className="">
              <Col md="auto">
                <h3>{post ? <h3> Edit group post </h3> : <h3> Create a new group post </h3>}</h3>
              </Col>
            </Row>

            <Row style={{ "margin-bottom": "3vh" }}>
              <Col md="5">
                <Form.Control
                  value={title}
                  type="text"
                  required
                  placeholder="Post title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>

              <Col md="auto">
                <Form.Check
                  checked={checkLimited()}
                  type="checkbox"
                  label="Limited spaces"
                  className="checkbox"
                  onChange={(e) => setLimited(e.target.checked)}
                />
              </Col>
              <Col md="4">
                <Form.Control
                  value={space}
                  required
                  type="number"
                  placeholder="Max inscriptions"
                  disabled={!checkLimited()}
                  onChange={(e) => setSpace(e.target.value)}
                />
              </Col>
            </Row>

            <Row style={{ "margin-bottom": "3vh" }}>
              <Form.Label>Target audience</Form.Label>
              <Col md="auto">
                <Form.Select required value={faculty} onChange={(e) => setFaculty(e.target.value)}>
                  <option disabled={true} selected value="">
                    Select the faculty of the course
                  </option>
                  <option value="Science and Bio-engineering Sciences">Science and Bio-engineering Sciences</option>
                  <option value="Medicine and Pharmacy">Medicine and Pharmacy</option>
                  <option value="Law and Criminology">Law and Criminology</option>
                </Form.Select>
              </Col>

              <Col md="auto">
                <Form.Select value={course} onChange={(e) => setCourse(e.target.value)}>
                  <option disabled={true} selected value="">
                    Select the course
                  </option>
                  <option value="Computer Systems">Computer Systems</option>
                  <option value="Discrete Maths">Discrete Maths</option>
                  <option value="Biomedische Chemie">Biomedische Chemie</option>
                  <option value="Biologie">Biologie</option>
                  <option value="Politieke Geschiedenis">Politieke Geschiedenis</option>
                  <option value="Statistiek I">Statistiek I</option>
                </Form.Select>
              </Col>
            </Row>

            <Row>
              <Form.Label>Practical information</Form.Label>
              <Col md="auto">
                <Form.Check
                  checked={checkFree()}
                  type="checkbox"
                  label="Free grouppost"
                  className="checkbox"
                  onChange={(e) => setFree(e.target.checked)}
                />
              </Col>
              <Col md="5">
                <Form.Control
                  value={price}
                  required
                  style={{ width: "20%" }}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  placeholder="Price"
                  disabled={checkFree()}
                />
              </Col>
              <Row>
                <Col md="auto">
                  <Form.Label> Date and time: </Form.Label>
                  <input
                    value={dateAndTime}
                    required
                    type="datetime-local"
                    id="birthdaytime"
                    name="birthdaytime"
                    onChange={(e) => handleDate(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Label style={{ color: "red", position: "absolute" }}> {dateWarning} </Form.Label>
                </Col>
              </Row>
            </Row>

            <Col md="3">
              <Form.Control
                value={location}
                style={{ "margin-bottom": "3vh" }}
                type="text"
                required
                placeholder="Location"
                onChange={(e) => setLocation(e.target.value)}
              />
            </Col>

            <Form.Label>Post description</Form.Label>
            <Col md="auto">
              <Form.Control
                value={desc}
                as="textarea"
                placeholder="Give a description of what this grouppost will be like"
                maxLength={573}
                rows={5}
                required
                onChange={(e) => setDesc(e.target.value)}
              />
            </Col>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Button type="submit">Submit</Button>
        </Row>
        <Row className="justify-content-md-center">
          {message.length > 0 ? message : ""}
        </Row>
      </Form>
    </div>
  );
};

export default CreateGroupSession;
