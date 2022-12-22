import React from "react";

/**
 * DESCRIPTION SHOWN WHEN VIEWING A PARTICULAR GROUP SESSION 
 */
function GroupSessionDescription(props) {
  let description = props.description;

  return (
    <div>
      <textarea value={description} readOnly></textarea>
    </div>
  );
}

export default GroupSessionDescription;
