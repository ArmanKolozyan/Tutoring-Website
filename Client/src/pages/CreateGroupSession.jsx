import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "../style.scss";
import axios from "axios";
import moment from "moment";
import { PasswordContext } from "../context/PasswordContext";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CreateGroupSession = () => {
  const post = useLocation().state;
  const navigate = useNavigate();

  const postDate = () => {
    if (post !== null) {
    const d = new Date(post.date_time);
    const result = [d.getFullYear(),
      d.getMonth()+1,
      d.getDate()].join('-')+'T'+
     [d.getHours(),
      d.getMinutes()].join(':');
      return result;
      } else{ 
        return false}
  }

  const [title, setTitle] = useState(post?.title || "");
  const [limited, setLimited] = useState(post?.limited || "1");
  const [space, setSpace] = useState(post?.max_inscriptions || "");
  const [faculty, setFaculty] = useState(post?.faculty || "");
  const [course, setCourse] = useState(post?.course || "");
  const [price, setPrice] = useState(post?.price || "");
  const [free, setFree] = useState(post?.free || 0);
  const [dateAndTime, setDateAndTime] = useState(post ? postDate() : "");
  const [desc, setDesc] = useState(post?.description || "");
  const [location, setLocation] = useState(post?.location || "");

  const { currentUser } = useContext(PasswordContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (post) {
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
        navigate(`/groupsession/${postId.data}`); }
        else {
      await axios({
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
    }
    } catch (err) {
      console.log(err);
    }
  };

  const checkLimited = () => {
    if (limited == "1") {
      return true;
    } else {
      return false;
    }
  };

  const checkFree = () => {
    if (free == 1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="create-tutoring-session">
      <Form onSubmit={(event) => handleSubmit(event)}>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Row className="">
              <Col md="auto">
                <h3> 
                {post ? <h3> Edit group session </h3> : <h3> Create a new group session </h3>}
                </h3>
              </Col>
            </Row>

            <Row>
              <Col md="5">
                <Form.Control
                  value={title}
                  type="text"
                  required
                  placeholder="Session Title"
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

            <Row>
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

            <Row className="">
              <Form.Label>Session information</Form.Label>
              <Col md="auto">
                <Form.Check
                checked={checkFree()}
                  type="checkbox"
                  label="Free groupsession"
                  className="checkbox"
                  onChange={(e) => setFree(e.target.checked)}
                />
              </Col>
              <Col md="5">
                <Form.Control
                value={price}
                  style={{ width: "10vw" }}
                  required
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  placeholder="Price"
                  disabled={checkFree()}
                />
              </Col>
              <Col md="auto">
                <Form.Label> Date and time: </Form.Label>
                <input
                value={dateAndTime}
                  required
                  type="datetime-local"
                  id="birthdaytime"
                  name="birthdaytime"
                  onChange={(e) => setDateAndTime(e.target.value)}
                />
              </Col>
            </Row>

            <Row>
              <Col md="5">
                <Form.Control
                value={location}
                  type="text"
                  required
                  placeholder="Location"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Col>
            </Row>

            <Form.Label>Session description</Form.Label>
            <Col md="auto">
              <Form.Control
              value={desc}
                as="textarea"
                placeholder="Give a description of what this groupsession will be like"
                maxLength={573}
                rows={5}
                required
                onChange={(e) => setDesc(e.target.value)}
              />
            </Col>
            <Row></Row>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Button type="submit">Submit</Button>
        </Row>
      </Form>
    </div>
  );
};

export default CreateGroupSession;
