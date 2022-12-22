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
  let location = props.location;
  let spotsTaken = props.spotsTaken;


  let priceText = "the cost of participation in this group session is " + price;
  if (free) {
    priceText = " participation of this group session is free!";
  }

  let limitedpacestext = "Spots for this session are not limited.";
  let limitedspacetext2 = "";
  if (limited) {
    limitedpacestext = "This is a group session with limited space, and";
    limitedspacetext2 = spotsTaken + " out of the " + space + " have been taken already!";
  }

    // format date to dd/mm/yy using Regular Expressions
    function formatDate(input) {
      let date = input.match(/\d+/g),
        day = date[2],
        month = date[1],
        year = date[0].substring(2); // get only two digits
  
      return day + "/" + month + "/" + year;
    }

  return (
    <div>
      <p>
        <h6>This event will take place on: </h6>
        {dateTime ? formatDate(dateTime) + " " + dateTime.slice(11,16) : ""}
      </p>
      <p>
        <h6> The Target audience of this group session is:</h6>
        people from the {faculty} faculty, following the {course} course
      </p>


      <p>
        <h6>Inscriptions: </h6>
      </p>
      <p>
        {limitedpacestext}
        <br></br>
        {limitedspacetext2}
        {limited ? <ProgressBar visuallyHidden={true} min={0} max={space} now={spotsTaken} animated={true} label={`${spotsTaken} of ${space}`}/> : ""}
      </p>

      <p> <h6>The price for this session is:</h6> {free ? "free session" : price + " euros"} </p>
      <p> <h6>The session will take place in the following location:</h6> {location}</p>

    </div>
  );
}

export default GroupSessionInfo;