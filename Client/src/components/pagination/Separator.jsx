import React from "react";
import Button from "react-bootstrap/Button";

/**
 * COMPONENT FOR HANDLING THE PAGE NUMBERS FOR PAGINATION
 * Arguments:
 * nmbrPerPage => number of posts per page
 * totalNmbr => total number of posts
 * separateFunc => callback funtion that gets called when
 * the users presses on one of the pages
 */
const Separator = ({ nmbrPerPage, totalNmbr, separateFunc }) => {
  const pages = [];
  console.log("hiiii")
  console.log(totalNmbr)
  console.log(nmbrPerPage)
  for (let i = 1; i <= Math.ceil(totalNmbr / nmbrPerPage); i++) {
    console.log(i)
    pages.push(i); // all the pages
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pages.map((number) => (
          <li key={number} className="page-item">
            <Button onClick={() => separateFunc(number)} className="page-link">
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Separator;
