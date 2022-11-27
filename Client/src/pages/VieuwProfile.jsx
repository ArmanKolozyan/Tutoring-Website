import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SessionInfo from "../components/SessionInfo";
import TutorInfo from "../components/TutorCard";
import SessionDescription from "../components/SessionDescription";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Card from "react-bootstrap/Card";

const VieuwProfile = () => {
  let Name = "Stoffel";
  let SurName = "Oostvogels";
  let Age = 19;
  let PhoneNumber = "0411929242";
  let EmailAdress = "Stoffel@hotmail.be";
  let Fields_of_study = "ComputerSience";
  let ProfilePicture =
    "https://scontent-bru2-1.xx.fbcdn.net/v/t31.18172-1/10945869_121577144882309_2985454743005061280_o.jpg?stp=dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_ohc=i4H20OgZaf8AX_yFfIP&_nc_ht=scontent-bru2-1.xx&oh=00_AfCbLBH9ApKn1jSQ1inEoeVN6U787gUNyVcO8EtlKqQBEQ&oe=63A97816";
  let description = 'Lorem ipsum is een opvultekst die drukkers, zetters, grafisch ontwerpers en dergelijken gebruiken om te kijken hoe een opmaak er grafisch uitziet. De eerste woorden van de tekst luiden doorgaans Lorem ipsum dolor sit amet, consectetur adipiscing elit ... Wikipedia'
  return (
    <div className="VieuwProfile">
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <div className="PersonInfo">
              <Row className="justify-content-md-center">
                <h5> {Name} </h5> <h6> {SurName} </h6>
                <p>I am {Age} years of age.</p>
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
                <p>I am currently studying {Fields_of_study}.</p>
              </Row>
            </div>
          </Col>

          <Col md="auto">
            <div className="ProfilePicture">
              <Card style={{ width: "20rem" }}>
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

export default VieuwProfile;
