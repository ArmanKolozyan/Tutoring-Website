import React from "react";
import Button from "react-bootstrap/Button";

const Separator = ({ nmbrPerPage, totalNmbr, separateFunc }) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalNmbr / nmbrPerPage); i++) {
    pages.push(i);
  }

  return (
    <nav>
      <ul className="pagination"> 
        {pages.map((number) => (
          <li key={number} className="page-item">
            <Button style={{"all" : "revert"}} onClick={() => separateFunc(number)} className="page-link">
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Separator;
