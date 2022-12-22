import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const GroupCard = ({ post }) => {
  const [user, setUser] = useState({});
  const [registrations, setRegistrations] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/user/${post.userid}`,
        });
        setUser(res.data.data);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    if (post) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/groupposts/registrations/count`,
          params: {
            session_id: post.id,
          },
        });
        setRegistrations(res.data.data);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    if (post) {
      console.log(post);
      fetchData();
    }
  }, [post]);

  return (
    <div className="post" key={post.id}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>

      <Container>
        <Row className="justify-content-md-center">
          <Row className="justify-content-md-center">
            <Col>
              <Row className="justify-content-md-center">
                <Link className="link" to={`/groupsession/${post.id}`}>
                  <h1 style={{ color: "black", "overflow-wrap": "break-word" }}>{post.title}</h1>
                </Link>
              </Row>

              <Row className="justify-content-md-center">
                <Col md="auto">
                  <div className="stars">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                  </div>
                </Col>

                <Col>
                  <p>
                    {" "}
                    The price of this session is :{" "}
                    <span style={{ fontWeight: "bold" }}> € {post.free ? 0 : post.price}</span>{" "}
                  </p>
                </Col>

                <Col>
                  <p>
                    Total registrations :<span style={{ fontWeight: "bold" }}> {registrations}</span>{" "}
                  </p>
                </Col>
              </Row>

              <Row className="justify-content-md-center">
                <p>{post.description}</p>
              </Row>

              <Row>
                <Col md="auto">
                  <Link to={`/groupsession/${post.id}`} className="btn btn-primary">
                    Visit Post
                  </Link>
                </Col>
              </Row>
            </Col>

            <Col md="auto">
              {user.img ? (
                <img
                  style={{
                    "margin-left": "auto",
                    "max-width": "80%",
                    display: "block",
                    height: "auto",
                    "border-radius": "50px",
                  }}
                  src={`../uploads/${user?.img}`}
                  key={user.img}
                  alt=""
                />
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
};

export default GroupCard;
