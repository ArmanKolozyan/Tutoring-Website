import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import { PasswordContext } from "../../context/PasswordContext";
import { useContext } from "react";

/**
 * COMPONENT FOR UPDATING THE PROFILE PICTURE OF THE USER 
 * (WITH LIVE PREVIEW)
 */
function UpdatePicture() {
  const [profilePicture, setProfilePicture] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState("");
  const [message, setMessage] = useState("");

  const { currentUser } = useContext(PasswordContext);

  const [preview, setPreview] = useState((currentUser?.img !== null) ? `../uploads/${currentUser.img}` : false);

  // make preview of the, not yet fully, uploaded image
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
        url: `http://localhost:8800/users/profilePicture/${currentUser.id}`,
        data: formData,
      });
      currentUser.img = res.data.data;
      localStorage.setItem("user", JSON.stringify(currentUser));
      setMessage("Your image is updated!");
    } catch (err) {
      setMessage(err.response.data.message)
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmitFile}>
        <Card style={{ width: "20rem" }}> 
        { preview ?
          <Card.Img variant="top" src={ preview} />
          : ""}
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
              <Card.Text style={{"margin-top": "1vh"}}>
                {message.length !== 0 ? message : ""}
              </Card.Text>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Form>
    </div>
  );
}

export default UpdatePicture;
