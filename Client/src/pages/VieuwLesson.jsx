import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LessonInfo from "../components/LessonInfo";
import TeacherInfo from "../components/TeacherCard";
import LessonDescription from "../components/LessonDescription";
import Button from 'react-bootstrap/Button';

const VieuwLesson = () => {
  return (
    <div className="VieuwLesson">
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
          <Row className="justify-content-md-center">

            <div className="LessonInfo">
              <LessonInfo
                lessonName={"Dummieeeeles"}
                lessonFac={"Dumiieeeefac"}
                lessonPrice={10}
                lessonFreeTrial={true}
                Experience={3}
              />
            </div>
            </Row>

            <Row className="justify-content-md-center">
          <Col md="">
            <div className="LessonDescription">
              <LessonDescription
              description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"}
              />
            </div>
          </Col>
        </Row>
          </Col>

          <Col md="auto">
            <div className="TeacherInfo">
              <TeacherInfo
                teacherName={"Stoffel Oostvogels"}
                teacherText={
                  "This is my personal teacher textje, where I talk a bit about myself :)"
                }
                teacherAge={21}
                AvgRating={3}
                ProfileLink={"http://localhost:3000/Login"}
                PhotoLink={
                  "https://scontent-bru2-1.xx.fbcdn.net/v/t31.18172-1/10945869_121577144882309_2985454743005061280_o.jpg?stp=dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_ohc=sCUmLGT4B-kAX-ilsrj&_nc_ht=scontent-bru2-1.xx&oh=00_AfA-ERGrIuPLDHgn4ZoN7-cKZ622dJ6dkSDyoqEUE2ahRQ&oe=63A43216"
                }
              />
            </div>
          </Col>
        </Row>

        <Row className="justify-content-md-center">

        <Button>
        Contact Teacher
      </Button>
        </Row>

      </Container>
    </div>
  );
};

export default VieuwLesson;
