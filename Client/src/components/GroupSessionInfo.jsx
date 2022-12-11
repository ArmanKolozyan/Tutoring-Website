import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

function GroupSessionInfo(props) {
  let faculty = props.faculty;
  let course = props.course;
  let free = props.free;
  let price = props.price;
  let limited = props.limited;
  let space = props.space;
  let dateTime = props.dateTime;

  let SpotsTakenSession = 14;

  let priceText = "the cost of participation in this groupsession is " + price;
  if (free) {
    priceText = " part of this group session is free!";
  }

  let limitedpacestext = "There are unlimited spots for this groupsession";
  let limitedspacetext2 = "";
  if (limited) {
    limitedpacestext = "This is a groupsession with limited space, and";
    limitedspacetext2 = SpotsTakenSession + " out of the " + space + " have been taken already!";
  }

  return (
    <div>
      <p>
        <h6>This event will take place on </h6>
        {dateTime}.
      </p>
      <p>
        <h6> The Target audience of this groupsession is:</h6>
        People from the {faculty} faculty, following the {course} course.
      </p>

      <p>
        {limitedpacestext}
        <br></br>
        {limitedspacetext2}
        <ProgressBar min={0} max={space} now={SpotsTakenSession} label={`${SpotsTakenSession} of ${space}`} />
      </p>

      <p>The price for this session will be {price} euros.</p>
    </div>
  );
}

export default GroupSessionInfo;
