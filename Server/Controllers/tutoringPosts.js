import { db } from "../db.js";
import { check, validationResult } from "express-validator";

// get all tutoring posts from the database
export const getTutoringPosts = (req, res) => {
  let q = "SELECT * FROM tutoring_posts";
  const startIdx = req.query.start;
  const endIdx = req.query.end;

  //validation that the user is logged in
  if (typeof req.user === "undefined") {
    return res.status(401).json({ message: "You have to first log in!", data: [] });
  }

  // checks to prevent sql injection
  if (startIdx !== undefined && endIdx !== undefined && parseInt(startIdx) !== NaN && parseInt(endIdx) !== NaN) {
    q = `SELECT * FROM tutoring_posts LIMIT ${startIdx}, ${endIdx - startIdx}`;
  }

  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ message: "Fetching all tutoring posts failed.", data: [] });

    return res.status(200).json({ message: "", data: data });
  });
};

// get a single tutoring post based on the given id
export const getSingleTutoringPost = (req, res) => {
  const q =
    "SELECT p.id, `course`, `field_of_study`, `description`, `date`, `experience`, `price`, `free_test`, p.uid, u.firstname FROM users u JOIN tutoring_posts p ON u.id = p.uid WHERE p.id = ? ";

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
    if (err) return res.status(500).json({ message: "Fetching the specified tutoring post failed.", data: [] });

    return res.status(200).json({ message: "", data: data[0] });
  });
};

// add a tutoring post
export const addTutoringPost = (req, res) => {
  const q =
    "INSERT INTO tutoring_posts(`course`, `field_of_study`, `description`, `date`, `uid`, `experience`, `price`, `free_test`) VALUES (?)";

  //validation that the user is logged in
  if (typeof req.user === "undefined") {
    return res.status(401).json({ message: "You have to first log in!", data: [] });
  }

  const values = [
    req.body.course,
    req.body.field,
    req.body.desc,
    req.body.date,
    req.user.id,
    req.body.exp,
    req.body.price,
    req.body.test,
  ];

  let post_id;

  const withCallback = (callback) => {
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json({ message: "Inserting the given tutoring post failed.", data: [] });
      post_id = data.insertId;
      callback(req.body.regions, post_id);
      return res.status(200).json({ message: "", data: post_id });
    });
  };
  withCallback(insertRegions);
};

// insert the regions where the tutor can teach
const insertRegions = (regions, post_id) => {
  const q1 = `DELETE FROM tutor_regions WHERE post_id = ?`;
  const q2 = "INSERT INTO tutor_regions SET post_id = ?, latitude = ?, longitude = ?, radius = ?";

  db.query(q1, [post_id], (err, data) => {
    if (err) res.status(500).json({ message: "Updating the regions failed.", data: [] });
  });

  regions.forEach((region) => {
    db.query(q2, [post_id, region.latitude, region.longitude, region.radius], (err, data) => {
      if (err) res.status(500).json({ message: "Inserting the new regions failed.", data: [] });
    });
  });
};

// get the regions where the tutor can teach
export const getRegions = (req, res) => {
  const q = "SELECT `latitude`, `longitude`, `radius` FROM tutor_regions WHERE post_id = ? ";

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
    if (err) return res.status(500).json({ message: "Fetching the regions failed.", data: [] });
    return res.status(200).json({ message: "", data: data });
  });
};

// update the information of a specific tutoring post
export const updateTutoringPost = (req, res) => {
  const post_id = req.params.id;

  //here happens validation to check that the user updates its own post
  const q =
    "UPDATE tutoring_posts SET `course`=?,`field_of_study`=?,`description`=?,`date`=?,`experience`=?,`price`=?, `free_test`=? WHERE `id` = ? AND `uid` = ?";

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
    req.body.course,
    req.body.field,
    req.body.desc,
    req.body.date,
    req.body.exp,
    req.body.price,
    req.body.test,
    post_id,
    req.user.id,
  ];

  db.query(q, values, (err, data) => {
    console.log(values);
    if (err) return res.status(500).json({ message: "Updating the tutoring post failed.", data: [] });
  });
  insertRegions(req.body.regions, post_id);
  return res.status(200).json({ message: "", data: post_id });
};

// delete a specific tutoring post by providing its id
export const deleteTutoringPost = (req, res) => {
  const post_id = req.params.id;

  //here happens validation to check that the user deletes its own post
  const q = "DELETE FROM tutoring_posts WHERE `id` = ? AND uid = ?";

  //validation that the user is logged in
  if (typeof req.user === "undefined") {
    return res.status(401).json({ message: "You have to first log in!", data: [] });
  }

  // validation of provided information
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array().map((x) => x.msg), data: [] });
  }

  db.query(q, [post_id, req.user.id], (err, data) => {
    if (err) return res.status(500).json({ message: "Deleting tutoring post failed.", data: [] });

    return res.status(200).json({ message: "Tutoring post is deleted.", data: [] });
  });
};

// for the search functionality
export const findTutoringPosts = (req, res) => {
  const keyword = req.query.keyword;
  const course = req.query.course;
  const field = req.query.field;
  const freeTest = req.query.freeTest;
  const startIdx = req.query.start;
  const endIdx = req.query.end;

  //validation that the user is logged in
  if (typeof req.user === "undefined") {
    return res.status(401).json({ message: "You have to first log in!", data: [] });
  }

  // validation of provided information
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array().map((x) => x.msg), data: [] });
  }

  const checkOrder = () => {
    let order;

    switch (req.query.orderBy) {
      case "Price low-high":
        order = "ORDER BY price ASC ";
        break;
      case "Price high-low":
        order = "ORDER BY price DESC ";
        break;
      case "Experience high-low":
        order = "ORDER BY experience DESC ";
        break;
      case "Experience low-high":
        order = "ORDER BY experience ASC ";
        break;
      default: // validation
        order = "";
    }
    return order;
  };

  const checkFreeTest = () => {
    if (freeTest === "true") {
      return "AND free_test = 1 ";
    } else {
      return "";
    }
  };

  const checkLimits = () => {
    // to prevent SQL injections
    if (startIdx !== undefined && endIdx !== undefined && parseInt(startIdx) !== NaN && parseInt(endIdx) !== NaN) {
      return `LIMIT ${startIdx}, ${endIdx - startIdx}`;
    } else {
      return "";
    }
  };

  let posts;
  const values = ["%" + keyword + "%", "%" + course + "%", "%" + field + "%", freeTest];
  db.query(
    "SELECT * FROM tutoring_posts WHERE description LIKE ? AND course LIKE ? AND field_of_study LIKE ? " +
      checkFreeTest() +
      checkOrder() +
      checkLimits(),
    values,
    (err, data) => {
      if (err) return res.status(500).json({ message: "Fetching the posts failed.", data: [] });
      posts = data;
    }
  );

  // we also provide the total amount of posts (can be used to determine pages for the pagination)
  let q2 =
    "SELECT COUNT(id) AS amount FROM tutoring_posts WHERE description LIKE ? AND course LIKE ? AND field_of_study LIKE ? ";

  db.query(q2 + checkFreeTest() + checkOrder(), values, (err, data) => {
    if (err) return res.status(500).json({ message: "Fetching the amount of posts failed.", data: [] });
    return res.status(200).json({ message: "", data: { posts: posts, amount: data[0].amount } });
  });
};

// returns the total amount of tutoring posts (can be used to determine the number of pages for the pagination)
export const getTutoringPostsAmount = (req, res) => {
  let q = "SELECT COUNT(id) AS amount FROM tutoring_posts";

  //validation that the user is logged in
  if (typeof req.user === "undefined") {
    return res.status(401).json({ message: "You have to first log in!", data: [] });
  }

  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ message: "Fetching the amount of posts failed.", data: [] });

    return res.status(200).json({ message: "", data: data[0].amount });
  });
};
