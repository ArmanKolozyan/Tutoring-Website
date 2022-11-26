import React, { useState } from "react";
import Logo from "../images/Logo.png";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function UpdatePicture(props) {
  let ProfilePicture = props.ProfilePicture;

  //om frontend te testen
  ProfilePicture =
    "https://scontent-bru2-1.xx.fbcdn.net/v/t31.18172-1/10945869_121577144882309_2985454743005061280_o.jpg?stp=dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_ohc=i4H20OgZaf8AX_yFfIP&_nc_ht=scontent-bru2-1.xx&oh=00_AfCbLBH9ApKn1jSQ1inEoeVN6U787gUNyVcO8EtlKqQBEQ&oe=63A97816";

  return (
    <div>
      <Form>
        <Card style={{ width: "20rem" }}>
          <Card.Img variant="top" src={ProfilePicture} />
          <Card.Body>
            <Card.Text>Change ProfilePicture </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Choose a new picture</Form.Label>
                <Form.Control type="file" size="sm" />
              </Form.Group>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Form>
    </div>
  );
}

export default UpdatePicture;
