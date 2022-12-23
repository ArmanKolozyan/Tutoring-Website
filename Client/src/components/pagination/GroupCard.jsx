import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/**
 * CARDS USED WHEN DISPLAYING POSTS ON MAIN GROUP SESSIONS PAGE (UNDER THE SEARCH)
 */
const GroupCard = ({ post }) => {
  const [user, setUser] = useState({});
  const [registrations, setRegistrations] = useState();

  // getting the author information
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/users/${post.userid}`,
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

  // getting the number of registrations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/groupposts/registrations/count`,
          params: {
            post_id: post.id,
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
                <Link className="link" to={`/grouppost/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
              </Row>

              <Row className="justify-content-md-center">
                <Col>
                  <p>
                    {" "}
                    The price for one session is :{" "}
                    <span className="bold"> € {post.free ? 0 : post.price}</span>{" "}
                  </p>
                </Col>

                <Col>
                  <p>
                    Total registrations :<span className="bold"> {registrations}</span>{" "}
                  </p>
                </Col>
              </Row>

              <Row className="justify-content-md-center">
                <p>{post.description}</p>
              </Row>

              <Row>
                <Col md="auto">
                  <Link to={`/grouppost/${post.id}`} className="btn btn-primary">
                    Visit Post
                  </Link>
                </Col>
              </Row>
            </Col>

            <Col md="auto">
              {user.img ? (
                <img
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
