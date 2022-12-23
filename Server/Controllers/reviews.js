import { db } from "../db.js";
import { validationResult } from "express-validator";

// adds the given review to the database
export const addPostReview = (req, res) => {
  const q = "INSERT INTO post_reviews(`title`, `description`, `rating`, `date`, `authorid`, `postid`) VALUES (?)";

  //validation that the user is logged in
  if (typeof req.user === "undefined") {
    return res.status(401).json({ message: "You have to first log in!", data: [] });
  }

  // validation of provided information
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array().map((x) => x.msg), data: [] });
  }

  const values = [
    req.body.title,
    req.body.description,
    req.body.nrOfStars,
    req.body.date,
    req.user.id,
    parseInt(req.body.id),
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json({ message: "Inserting review failed.", data: [] });

    return res.status(200).json({ message: "", data: [] });
  });
};

// get all reviews of a specific post
export const getSinglePostReviews = (req, res) => {
  const q =
    "SELECT r.id, `title`, `description`, `rating`, `date`, `authorid`, `postid`, u.firstname FROM post_reviews r JOIN users u ON r.authorid = u.id WHERE r.postid = ? ";

  //validation that the user is logged in
  if (typeof req.user === "undefined") {
    return res.status(401).json({ message: "You have to first log in!", data: [] });
  }

  // validation of provided information
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array().map((x) => x.msg), data: [] });
  }

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json({ message: "Fetching reviews failed.", data: [] });

    return res.status(200).json({ message: "", data: data });
  });
};

// get the average rating of a user
export const getAverageUserRating = (req, res) => {
  const tutor_id = req.query.tutor_id;
  const q =
    "SELECT AVG(rating) as average FROM post_reviews r JOIN tutoring_posts p ON r.postid = p.id WHERE p.uid = ?";

  //validation that the user is logged in
  if (typeof req.user === "undefined") {
    return res.status(401).json({ message: "You have to first log in!", data: [] });
  }

  // validation of provided information
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array().map((x) => x.msg), data: [] });
  }

  db.query(q, [tutor_id], (err, data) => {
    if (err) return res.status(500).json({ message: "Fetching user average rating failed.", data: [] });
    return res.status(200).json({ message: "", data: Math.round(data[0].average) });
  });
};

// get the average rating of a post
export const getAveragePostRating = (req, res) => {
  const post_id = req.query.post_id;
  const q = "SELECT AVG(rating) as average FROM post_reviews WHERE postid = ?";

  //validation that the user is logged in
  if (typeof req.user === "undefined") {
    return res.status(401).json({ message: "You have to first log in!", data: [] });
  }

  // validation of provided information
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array().map((x) => x.msg), data: [] });
  }

  db.query(q, [post_id], (err, data) => {
    if (err) return res.status(500).json({ message: "Fetching post average rating failed.", data: [] });
    console.log("aa");
    console.log(data);
    return res.status(200).json({ message: "", data: Math.round(data[0].average) });
  });
};
