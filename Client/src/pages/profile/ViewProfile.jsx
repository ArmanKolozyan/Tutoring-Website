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

/**
 * COMPONENT FOR VIEWING THE PROFILE OF SOMEONE.
 */
const ViewProfile = () => {

  const location = useLocation();
  const userid = location.pathname.split("/")[2];
  const [user, setUser] = useState("");

  // get the user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/users/${userid}`,
        });
        setUser(res.data.data);
      } catch (err) {
        console.log(err.response.data.message);
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

  let name = user.firstname;
  let surName = user.lastname;
  let birthdate = user.birthDate;
  let emailAdress = user.email;
  const [studies, setStudies] = useState([]); // must be initialised by an empty array! otherwise not possible to call 'map' 
  let profilePicture = `../uploads/${user.img}`;
  let description = user.intro;

  // get the studies of the user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/studies/${user.id}`,
        });
        let result = res.data.data.map(x => x.field);
        setStudies(result);
      } catch (err) {
        console.log(err.response.data.message);
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
                <h5> {name} </h5> <h6> {surName} </h6>
                <p>I was born on {birthdate ? formatDate(birthdate.slice(0,10)) : ""}.</p>
              </Row>



              <Row className="justify-content-md-center">
                <p>I have studied: <pre>{studies.join('\n')}</pre></p>
              </Row>


              <Row className="">
                <Form.Label>Contact Information:</Form.Label>
                <Col md="auto">
                  <FloatingLabel label="Email address">
                    <Form.Control className="disable-resize" as="textarea" readOnly value={emailAdress}/>
                  </FloatingLabel>
                </Col>
              </Row>

            </div>
          </Col>

          <Col md="auto">
            <div className="ProfilePicture">
              <Card style={{ width: "20rem", border: "0" }}>
                <Card.Img variant="top" src={profilePicture} />
                <Card.Body></Card.Body>
              </Card>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
        <Col md="auto">
          <div className="ProfileDescription">
            <textarea value = {description} readOnly></textarea>
          </div>
          </Col>
        </Row>

        
      </Container>
    </div>
  );
};

export default ViewProfile;
