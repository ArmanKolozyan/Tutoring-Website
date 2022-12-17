import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Card from "react-bootstrap/Card";

const ViewProfile = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const userid = location.pathname.split("/")[2];
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/user/${userid}`,
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (userid) {
      fetchData();
    }
  }, [userid]);

  // format date to dd/mm/yy using Regular Expressions
  function formatDate (input) {
    let date = input.match(/\d+/g),
    day = date[2],
    month = date[1],
    year = date[0].substring(2); // get only two digits
  
    return day+'/'+month+'/'+year;
  }

  let Name = user.firstname;
  let SurName = user.lastname;
  let Birthdate = user.birthDate;
  let EmailAdress = user.email;
  const [studies, setStudies] = useState([]); // must be initialised by an empty array! otherwise not possible to call 'map' 
  let ProfilePicture = `../uploads/${user.img}`;
  let description = user.intro;
  let PhoneNumber = "0411929242";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/studies/${user.id}`,
        });
        let result = res.data.map(x => x.field);
        setStudies(result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [user.id]);

  return (
    <div className="ViewProfile">
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <div className="PersonInfo">
              <Row className="justify-content-md-center">
                <h5> {Name} </h5> <h6> {SurName} </h6>
                <p>I was born on {Birthdate ? formatDate(Birthdate.slice(0,10)) : ""}.</p>
              </Row>

              <Row className="">
                <Form.Label>Contact Information:</Form.Label>
                <Col md="auto">
                <FloatingLabel label="Phonenumber">
                    <Form.Control as="textarea" disabled value={PhoneNumber} />
                  </FloatingLabel>
                </Col>
                <Col md="auto">
                  <FloatingLabel label="Emailadress">
                    <Form.Control as="textarea" disabled value={EmailAdress} />
                  </FloatingLabel>
                </Col>
              </Row>

              <Row className="justify-content-md-center">
                <p>I have studied <pre>{studies.join('\n')}</pre></p>
              </Row>
            </div>
          </Col>

          <Col md="auto">
            <div className="ProfilePicture">
              <Card style={{ width: "20rem", border: "0" }}>
                <Card.Img variant="top" src={ProfilePicture} />
                <Card.Body></Card.Body>
              </Card>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
        <Col md="auto">
          <div className="ProfileDescription">
            <textarea readOnly>{description}</textarea>
          </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ViewProfile;
