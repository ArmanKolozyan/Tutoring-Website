import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import axios from "axios";

/**
 * SEARCH BAR FOR TUTORING SESSIONS
 * THE ARGUMENTS:
 * seperate => for the separation of content into pages
 * callback => function that is called when new posts are fetched based on the search fields
 * start & end indices
 * setSearching to indicate whether the user is using a search field at the moment
 * setTotalPosts to indicate how many posts are now distributed over the pages
 * (technically they are only available when moving to that page, because pagination happens in back-end)
 */
function Searchbar({ separate, callback, start, end, setSearching, setTotalPosts }) {
  const [keyword, setKeyword] = useState("");
  const [course, setCourse] = useState("");
  const [field, setField] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [freeTest, setFreeTest] = useState(false);

  // calling back-end to filter the posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: "http://localhost:8800/tutoringpostsSearch",
          params: {
            keyword: keyword,
            course: course,
            field: field,
            orderBy: orderBy,
            freeTest: freeTest,
            start: start,
            end: end,
          },
        });
        callback(res.data.data.posts);
        setTotalPosts(res.data.data.amount);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    { // if all filters are on default
      if (keyword === "" && course === "" && field === "" && orderBy === "" && freeTest === false) {
        setSearching(false);
      } else {
        separate(1); // we move to page one before filtering
        setSearching(true);
        fetchPosts();
      }
    }
  }, [keyword, course, field, orderBy, freeTest, start, end]);

  return (
    <div className="Searchbar">
      <Form>
        <Card>
          <Card.Body>
            <Card.Text>Search/ Filter Options </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              <FloatingLabel controlId="SearchInput" label="Search for">
                <Form.Control onChange={(e) => setKeyword(e.target.value)} required type="text" />
              </FloatingLabel>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <FloatingLabel controlId="FieldInput" label="Select a field">
                    <Form.Select onChange={(e) => setField(e.target.value)}>
                      <option value="">All</option>
                      <option value="Science and Bio-engineering Sciences">Science and Bio-engineering Sciences</option>
                      <option value="Medicine and Pharmacy">Medicine and Pharmacy</option>
                      <option value="Law and Criminology">Law and Criminology</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col md="auto">
                  <FloatingLabel controlId="CourseInput" label="Select a course">
                    <Form.Select onChange={(e) => setCourse(e.target.value)}>
                      <option value="">All</option>
                      <option value="Computer Systems">Computer Systems</option>
                      <option value="Discrete Maths">Discrete Maths</option>
                      <option value="Biomedische Chemie">Biomedische Chemie</option>
                      <option value="Biologie">Biologie</option>
                      <option value="Politieke Geschiedenis">Politieke Geschiedenis</option>
                      <option value="Statistiek I">Statistiek I</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col md="auto">
                  <FloatingLabel controlId="OrderInput" label="Sort posts">
                    <Form.Select onChange={(e) => setOrderBy(e.target.value)}>
                      <option value="Default">Default sorting</option>
                      <option value="Price low-high">Price lowest to highest</option>
                      <option value="Price high-low">Price highest to lowest</option>
                      <option value="Experience high-low">Experience highest to lowest</option>
                      <option value="Experience low-high">Experience lowest to highest</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row className="justify-content-md-center">
                <Col md="3">
                  <Form.Check
                    type="checkbox"
                    label="Offers a free test session"
                    className="checkbox"
                    onChange={(e) => setFreeTest(e.target.checked)}
                  />
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Form>
    </div>
  );
}

export default Searchbar;
