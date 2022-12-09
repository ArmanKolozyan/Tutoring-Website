import { db } from "../db.js";

export const addPostReview = (req, res) => {
    // here we should check authentication

    console.log()
  
    const q =
      "INSERT INTO post_reviews(`comment`, `rating`, `date`, `authorid`, `postid`) VALUES (?)";
  
    const values = [
      req.body.description,
      req.body.nrClickedStars,
      req.body.date,
      req.user[0].id,
      req.body.id,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
      });
}


