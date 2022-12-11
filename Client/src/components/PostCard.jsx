import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const PostCard = ({ post }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/user/${post.uid}`,
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (post) {
      fetchData();
    }
  }, []);
return (
    <div className="post" key={post.id}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>

      <Container>
        <Row className="justify-content-md-center">
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Row className="justify-content-md-center">
                <Link className="link" to={`/tutoringsession/${post.id}`}>
                  <h1 style={{ color: "black" }}>{post.course}</h1>
                </Link>
              </Row>

              <Row className="justify-content-md-center">
                <div
                  className="stars"
                >
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                </div>
              </Row>

              <Row className="justify-content-md-center">
                <p>{post.description}</p>
              </Row>

              <Row className="justify-content-md-center">
                <Col md="auto">
                  <Button>Visit Profile</Button>
                </Col>
              </Row>
            </Col>

            <Col md="auto">
              <img
                style={{ width: "50vh", height: "auto" }}
                src={`../uploads/${user?.img}`}
                key={user.img}
                alt=""
              />
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
};

export default PostCard;