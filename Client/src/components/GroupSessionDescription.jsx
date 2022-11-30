import React from "react"
import Logo from "../images/Logo.png"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function GroupSessionDescription(props) {
  let description = props.description;


  return (
    <div>
    <textarea value = {description} readOnly>
</textarea>
    </div>
  )
}

export default GroupSessionDescription