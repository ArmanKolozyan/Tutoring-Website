import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/**
 * CARDS USED WHEN DISPLAYING POSTS ON MAIN TUTORING PAGE (UNDER THE SEARCH)
 */
const TutoringCard = ({ post }) => {
  const stars = Array(5).fill(0);

  const [user, setUser] = useState({});
  const [rating, setRating] = useState({});
  const [avgRating, setAvgRating] = useState();

  // getting the author information
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/users/${post.uid}`,
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

  // getting the average rating of the post
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: "http://localhost:8800/postRatingAverage/",
          params: {
            post_id: post.id,
          },
        });
        setAvgRating(res.data.data);
        console.log("seeehhshshs");
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    console.log("seeehhshshs");
    if (post !== undefined) {
      fetchRating();
    }
    console.log("hhalllo");
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
                <Link className="link" to={`/tutoringpost/${post.id}`}>
                  <h1 >{post.course}</h1>
                </Link>
              </Row>

              <Row className="justify-content-md-center">
                <Col>
                  <p> Average rating :</p>
                  <p>
                    {" "}
                    <span className="bold"> {avgRating===0 ? "/" : avgRating}</span>{" "}
                  </p>
                </Col>

                <Col>
                  <p> The price for one session is: </p>
                  <p>
                    {" "}
                    <span className="bold"> € {post.price}</span>{" "}
                  </p>
                </Col>

                <Col>
                  <p> Years of experience :</p>
                  <p>
                    {" "}
                    <span className="bold"> {post.experience}</span>{" "}
                  </p>
                </Col>
              </Row>

              <Row className="justify-content-md-center">
                <p>{post.description.length > 80 ? post.description.substring(0, 80) + "..." : post.description} </p>
              </Row>

              <Row>
                <Col md="auto">
                  <Link to={`/tutoringpost/${post.id}`} className="btn btn-primary">
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
              )}{" "}
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
};

export default TutoringCard;
