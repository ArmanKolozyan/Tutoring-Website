import React from "react";
import Logo from "../images/Logo.png";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Searchbar(props) {
  return (
    <div className="Searchbar">
      <Form>
        <Card
          style={
            {
              /* width: "40vw" */
            }
          }
        >
          <Card.Body>
            <Card.Text>Search/ Filter Options </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              <FloatingLabel controlId="SearchInput" label="Search for">
                <Form.Control required type="text" />
              </FloatingLabel>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <FloatingLabel
                    controlId="CourseInput"
                    label="Select a course"
                  >
                    <Form.Select>
                      <option value="All">All</option>
                      <option value="Computer Systems">Computer Systems</option>
                      <option value="Discrete Maths">Discrete Maths</option>
                      <option value="Biomedische Chemie">
                        Biomedische Chemie
                      </option>
                      <option value="Biologie">Biologie</option>
                      <option value="Politieke Geschiedenis">
                        Politieke Geschiedenis
                      </option>
                      <option value="Statistiek I">Statistiek I</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col md="auto">
                  <FloatingLabel controlId="FieldInput" label="Select a Field">
                    <Form.Select>
                      <option value="All">All</option>
                      <option value="Science and Bio-engineering Sciences">
                        Science and Bio-engineering Sciences
                      </option>
                      <option value="Medicine and Pharmacy">
                        Medicine and Pharmacy
                      </option>
                      <option value="Law and Criminology">
                        Law and Criminology
                      </option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col md="auto">
                  <FloatingLabel controlId="MaxPriceInput" label="MaxPrice">
                    <Form.Control type="number" />
                  </FloatingLabel>
                </Col>

                <Col md="auto">
                  <FloatingLabel
                    controlId="RequiredExperience"
                    label="Years experience required"
                  >
                    <Form.Control type="number" />
                  </FloatingLabel>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row className="justify-content-md-center">
                <Col md="2">
                  <Form.Check
                    required
                    type="checkbox"
                    label="Free"
                    className="checkbox"
                  />
                </Col>

                <Col md="2">
                  <Form.Check
                    required
                    type="checkbox"
                    label="Free test session"
                    className="checkbox"
                  />
                </Col>

                <Col md="2">
                  <Form.Check
                    required
                    type="checkbox"
                    label="Has experience"
                    className="checkbox"
                  />
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Text>
              <Button type="submit">Apply</Button>
            </Card.Text>
          </Card.Body>
        </Card>
      </Form>
    </div>
  );
}

export default Searchbar;
