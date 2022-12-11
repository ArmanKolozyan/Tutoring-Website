import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { PasswordContext } from "../context/PasswordContext";
import { useContext } from "react";
import Select from "react-select";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function ProfileInfo() {
  const { currentUser } = useContext(PasswordContext);
  const { setCurrentUser } = useContext(PasswordContext);



  const [firstName, setFirstName] = useState(currentUser.firstname);
  const [lastName, setLastName] = useState(currentUser.lastname);
  const [birthdate, setBirthDate] = useState(
    currentUser.birthDate.slice(0, 10)
  );
  const [intro, setIntro] = useState(currentUser.intro);
  const [shortIntro, setShortIntro] = useState(currentUser.shortIntro);
  const [studies, setStudies] = useState({});




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "post",
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
        url: `http://localhost:8800/update/`,
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
      localStorage.setItem("user", JSON.stringify(currentUser));
  }
    catch (err) {
      console.log(err);
    }
  };

  const options = [
    {
      value: "Science and Bio-engineering Sciences",
      label: "Science and Bio-engineering Sciences",
    },
    { value: "Medicine and Pharmacy", label: "Medicine and Pharmacy" },
    { value: "Law and Criminology", label: "Law and Criminology" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/studies/${currentUser.id}`,
        });
        let result = res.data;
        result = result.map((x) => {
          const neww = {
            value: x.field,
            label: x.field,
          };
          return neww;
        });
        setStudies(result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentUser.id]);

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
            <FloatingLabel controlId="SurenameInput" label="Surname">
              <Form.Control as="textarea" defaultValue={lastName} onChange={(e) => setLastName(e.target.value)} />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col>
            <FloatingLabel controlId="BirthdateInput" label="Birthdate">
              <Form.Control type="date" defaultValue={birthdate} onChange={(e) => setBirthDate(e.target.value)} />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="PhoneNumberInput" label="PhoneNumber">
              <Form.Control
                type="text"
                pattern="\d*"
                maxlength="12"
                value={"0422913456"}
              />
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
              maxLength={573}
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
              maxLength={200}
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
        </Row>
      </Form>
    </div>
  );
}

export default ProfileInfo;
