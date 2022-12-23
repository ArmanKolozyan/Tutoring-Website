import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { PasswordContext } from "../../context/PasswordContext";
import { useContext } from "react";
import Select from "react-select";
import { useEffect } from "react";
import axios from "axios";


/**
 * COMPONENT FOR THE LOGGED IN USER THAT VIEWS ITS PROFILE (CAN EDIT HIS INFORMATION)
 * @returns 
 */
function ProfileInfo() {
  const { currentUser } = useContext(PasswordContext);

  const [firstName, setFirstName] = useState(currentUser.firstname);
  const [lastName, setLastName] = useState(currentUser.lastname);
  const [birthdate, setBirthDate] = useState(currentUser.birthDate.slice(0, 10));
  const [intro, setIntro] = useState(currentUser.intro);
  const [shortIntro, setShortIntro] = useState(currentUser.shortIntro);
  const [studies, setStudies] = useState({});
  const [message, setMessage] = useState("");

  const options = [
    {
      value: "Computer Science",
      label: "Computer Science",
    },
    { value: "Biology", label: "Biology" },
    { value: "Chemistry", label: "Chemistry" },
  ];

  // update user information
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "put",
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
        url: `http://localhost:8800/users/${currentUser.id}`,
        data: {
          firstName,
          lastName,
          birthdate,
          intro,
          shortIntro,
          studies,
        },
      });
      currentUser.firstname = firstName;
      currentUser.lastname = lastName;
      currentUser.birthDate = birthdate;
      currentUser.intro = intro;
      currentUser.shortIntro = shortIntro;
      localStorage.setItem("user", JSON.stringify(currentUser)); // make the update in the local storage (front-end)
      setMessage("Your information is updated!");
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  // get the studies of the user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/studies/${currentUser.id}`,
        });
        let result = res.data.data;
        result = result.map((x) => {
          const neww = {
            value: x.field,
            label: x.field,
          };
          return neww;
        });
        setStudies(result);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    fetchData();
  }, [currentUser.id]);


  // the parts to update a particular information
  return (
    <div>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <Form.Label>
          <b>Personal information</b>
        </Form.Label>

        <Row className="justify-content-md-center">
          <Col>
            <FloatingLabel controlId="NameInput" label="Name">
              <Form.Control type="text" defaultValue={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="SurnameInput" label="Surname">
              <Form.Control type="text" defaultValue={lastName} onChange={(e) => setLastName(e.target.value)} />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col>
            <FloatingLabel controlId="BirthdateInput" label="Birthdate">
              <Form.Control type="date" defaultValue={birthdate} onChange={(e) => setBirthDate(e.target.value)} />
            </FloatingLabel>
          </Col>
        </Row>

        <Form.Label>
          <b>Educational information</b>
        </Form.Label>
        <Form.Label>Select the field of studies you have taken</Form.Label>
        <Row className="justify-content-md-center">
          <Col>
            <FloatingLabel controlId="Fields_of_study_followedINput">
              <div className="multiselector">
                <Select
                  onChange={(item) => {
                    setStudies(item);
                  }}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  isMulti
                  options={options}
                  value={studies}
                  className="select"
                  isClearable={true}
                  isSearchable={true}
                  isLoading={false}
                  isRtl={false}
                  closeMenuOnSelect={false}
                />
              </div>
            </FloatingLabel>
          </Col>
        </Row>

        <Form.Label>
          <b>Description texts</b>
        </Form.Label>
        <Row className="justify-content-md-center">
          <Col>
            description to be shown at your profilepage
            <Form.Control
              as="textarea"
              value={intro}
              placeholder="Give a description of yourself that will be shown on your profilepage"
              maxLength={1500}
              rows={5}
              required
              onChange={(e) => setIntro(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col>
            description to be shown at each post you create
            <Form.Control
              as="textarea"
              defaultValue={shortIntro}
              placeholder="Give a description of yourself that will be shown on each post you create"
              maxLength={100}
              rows={3}
              onChange={(e) => setShortIntro(e.target.value)}
              required
            />
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col md="auto">
            <Button type="submit">Save Changes</Button>
          </Col>
          <Col md="auto">
          {message.length !== 0 ? message : ""}
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default ProfileInfo;
