import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";



/**
 * COMPONENT TO UPDATE THE PASSWORD OF THE USER
 * Back end of this component is not implmented, but the React component 
 * is provided here if another developer might be interested in adding that.
 */
function ChangePassword(props) {
  return (
    <div>
      <Form>
        <Card style={{ width: "20rem" }}>
          <Card.Body>
            <Card.Text>Update your password </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
            <FloatingLabel controlId="PasswordInput" label="Current password">
              <Form.Control required type="password"/>
            </FloatingLabel>
            </ListGroup.Item>
            <ListGroup.Item>
            <FloatingLabel controlId="NewPasswordInput" label="New password">
              <Form.Control  required type="password"/>
            </FloatingLabel>
            </ListGroup.Item>
            <ListGroup.Item>
            <FloatingLabel controlId="NewPasswordCheckInput" label="Confirm New password">
              <Form.Control required type="password"/>
            </FloatingLabel>
            </ListGroup.Item>
          </ListGroup>
          <Card.Body>
          <Card.Text>
          <Button type="submit">Update Password</Button>
          </Card.Text>
          </Card.Body>
        </Card>
      </Form>
    </div>
  );
}

export default ChangePassword;
