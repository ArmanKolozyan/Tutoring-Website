import React, { useState } from "react";
import Logo from "../images/Logo.png";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import { PasswordContext } from "../context/PasswordContext";
import { useContext } from "react";

function UpdatePicture() {
  const [profilePicture, setProfilePicture] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { currentUser } = useContext(PasswordContext);
  const { setCurrentUser } = useContext(PasswordContext);

  const [preview, setPreview] = useState(`../uploads/${currentUser.img}`);

  const makePreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    makePreview(file)
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // because multipart/form-data
    formData.append("file", profilePicture); 
    try {
      const res = await axios({
        method: "post",
        withCredentials: true,
        url: `http://localhost:8800/profilePicture/${currentUser.id}`,
        data: formData,
      });
      currentUser.img = res.data;
      localStorage.setItem("user", JSON.stringify(currentUser));
    } catch (err) {
      console.log(err);
    }
  };

  //om frontend te testen
  // ProfilePicture =
  //  "https://scontent-bru2-1.xx.fbcdn.net/v/t31.18172-1/10945869_121577144882309_2985454743005061280_o.jpg?stp=dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_ohc=i4H20OgZaf8AX_yFfIP&_nc_ht=scontent-bru2-1.xx&oh=00_AfCbLBH9ApKn1jSQ1inEoeVN6U787gUNyVcO8EtlKqQBEQ&oe=63A97816";

  return (
    <div>
      <Form onSubmit={handleSubmitFile}>
        <Card style={{ width: "20rem" }}>
          <Card.Img variant="top" src={preview ? preview : ""} />
          <Card.Body>
            <Card.Text>Change Profile Picture </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Choose a new picture</Form.Label>
                <Form.Control
                  type="file"
                  size="sm"
                  name="image"
                  onChange={handleFileInputChange}
                />
              </Form.Group>
              <Card.Text>
                <button className="btn" type="submit">
                  Submit
                </button>
              </Card.Text>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Form>
    </div>
  );
}

export default UpdatePicture;
