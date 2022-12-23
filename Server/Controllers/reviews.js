import { db } from "../db.js";

export const addPostReview = (req, res) => {
  // here we should check authentication

  const q = "INSERT INTO post_reviews(`title`, `description`, `rating`, `date`, `authorid`, `postid`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.description,
    req.body.nrClickedStars,
    req.body.date,
    req.user.id,
    parseInt(req.body.id),
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json({ message: "Inserting review failed.", data: [] });

    return res.status(200).json({ message: "", data: data[0] });
  });
};

export const getSinglePostReviews = (req, res) => {
  const q =
    "SELECT r.id, `title`, `description`, `rating`, `date`, `authorid`, `postid`, u.firstname FROM post_reviews r JOIN users u ON r.authorid = u.id WHERE r.postid = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json({ message: "Fetching reviews failed.", data: [] });

    return res.status(200).json({ message: "", data: data });
  });
};

export const getAverageRating = (req, res) => {
  const tutor_id = req.query.tutor_id;
  const q =
    "SELECT AVG(rating) as average FROM post_reviews r JOIN tutoring_posts p ON r.postid = p.id WHERE p.uid = ?";

  console.log("author");
  console.log(tutor_id)
  db.query(q, [tutor_id], (err, data) => {
    if (err) return res.status(500).json({ message: "Fetching user average rating failed.", data: [] });
    console.log("aa");
    return res.status(200).json({ message: "", data: Math.round(data[0].average) });
  });
};

export const getAveragePostRating = (req, res) => {
  const post_id = req.query.post_id;
  const q = "SELECT AVG(rating) as average FROM post_reviews WHERE postid = ?";
  console.log("uuuu");
  db.query(q, [post_id], (err, data) => {
    if (err) return res.status(500).json({ message: "Fetching post average rating failed.", data: [] });
    console.log("aa");
    console.log(data);
    return res.status(200).json({ message: "", data: Math.round(data[0].average) });
  });
};
