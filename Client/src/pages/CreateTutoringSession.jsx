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
import { TutorMap, mapRef, giveRegions } from "../components/TutorMap";
import { useNavigate, useLocation } from "react-router-dom";
import { ViewMap } from "../components/ViewMap";
import { useEffect } from "react";

const CreateTutoringSession = () => {
  const post = useLocation().state;
  const navigate = useNavigate();

  const [course, setCourse] = useState(post?.course || "");
  const [field, setField] = useState(post?.field_of_study || "");
  const [exp, setExp] = useState(post?.experience || "");
  const [price, setPrice] = useState(post?.price || "");
  const [test, setTest] = useState(post?.free_test || "");
  const [desc, setDesc] = useState(post?.description || "");

  const { currentUser } = useContext(PasswordContext);

  const [regions, setRegions] = useState([]); // must be initialised by an empty array! otherwise not possible to call 'map'

  const checkFree = () => {
    if (test == "1") {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (post) {
      const fetchData = async () => {
        try {
          const res = await axios({
            method: "get",
            withCredentials: true,
            url: `http://localhost:8800/tutoringpostRegion/${post.id}`,
          });
          //let result = res.data.map(x => x.field);
          setRegions(res.data.data);
        } catch (err) {
          console.log(err.response.data.message);
        }
      };
      fetchData();
    } else {
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (post) {
        const postId = await axios({
          method: "put",
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
          url: `http://localhost:8800/tutoringposts/${post.id}`,
          data: {
            course,
            field,
            desc,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            exp,
            price,
            test,
            regions: giveRegions(),
          },
        });
        navigate(`/tutoringpost/${postId.data.data}`);
      } else {
        const postId = await axios({
          method: "post",
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
          url: "http://localhost:8800/tutoringposts/",
          data: {
            course,
            field,
            desc,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            exp,
            price,
            test,
            regions: giveRegions(),
          },
        });
        navigate(`/tutoringpost/${postId.data.data}`);
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <div className="create-tutoring-post">
      <Form onSubmit={(event) => handleSubmit(event)}>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Row className="">
              <Col md="auto">{post ? <h3> Edit tutoring post </h3> : <h3> Create a new tutoring post </h3>}</Col>
            </Row>
            <Row className="">
              <Col md="auto">
                <Form.Select required value={field} onChange={(e) => setField(e.target.value)}>
                  <option disabled={true} selected value="">
                    Select the faculty of the subject
                  </option>
                  <option value="Science and Bio-engineering Sciences">Science and Bio-engineering Sciences</option>
                  <option value="Medicine and Pharmacy">Medicine and Pharmacy</option>
                  <option value="Law and Criminology">Law and Criminology</option>
                </Form.Select>
              </Col>

              <Col md="auto">
                <Form.Select required value={course} onChange={(e) => setCourse(e.target.value)}>
                  <option disabled={true} selected value="">
                    Select the subject
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
              <Form.Label>Post information</Form.Label>
              <Col md="5">
                <Form.Control
                  required
                  value={exp}
                  type="number"
                  placeholder="# Years experience with subject"
                  onChange={(e) => setExp(e.target.value)}
                />
              </Col>
              <Col md="auto">
                <Form.Control
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  placeholder="Price in €/h"
                />
              </Col>
              <Col md="auto">
                <Form.Check
                  checked={checkFree()}
                  type="checkbox"
                  label="Free Test-session"
                  className="checkbox"
                  onChange={(e) => setTest(e.target.checked)}
                />
              </Col>
            </Row>
            <Form.Label>Post description</Form.Label>

            <Col md="auto">
              <Form.Control
                as="textarea"
                placeholder="Give a description on how the sessions will be given"
                maxLength={573}
                rows={5}
                required
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Col>
            <Row></Row>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col md="auto">Draw the regions where you can teach</Col>
        </Row>
        <TutorMap regions={regions} />
        <Row className="justify-content-md-center">
          <Button type="submit">Submit</Button>
        </Row>
      </Form>
    </div>
  );
};

export default CreateTutoringSession;
