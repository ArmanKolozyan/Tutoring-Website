import { db } from "../db.js";
import { validationResult } from "express-validator";

// get all group posts from the database
export const getGroupPosts = (req, res) => {
  let q = "SELECT * FROM group_posts";
  const startIdx = req.query.start;
  const endIdx = req.query.end;

  //validation that the user is logged in
  if (typeof req.user === "undefined") {
    return res.status(401).json({ message: "You have to first log in!", data: [] });
  }

  // checks to prevent sql injection
  if (startIdx !== undefined && endIdx !== undefined && parseInt(startIdx) !== NaN && parseInt(endIdx) !== NaN) {
    q = `SELECT * FROM group_posts LIMIT ${startIdx}, ${endIdx - startIdx}`;
  }

  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ message: "Fetching all group posts failed.", data: [] });
    return res.status(200).json({ message: "", data: data });
  });
};

// get a group tutoring post based on the given id
export const getSingleGroupPost = (req, res) => {
  const q =
    "SELECT `id`, `title`, `limited`, `max_inscriptions`, `faculty`, `course`, `free`, `price`, `date_time`, `description`, `userid`, `location` FROM group_posts WHERE id = ? ";

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
    if (err) return res.status(500).json({ message: "Fetching the specified group post failed.", data: [] });

    return res.status(200).json({ message: "", data: data[0] });
  });
};

// add a group post
export const addGroupPost = (req, res) => {
  const q =
    "INSERT INTO group_posts(`title`, `limited`, `max_inscriptions`, `faculty`, `course`, `free`, `price`, `date_time`, `description`, `userid`, `location`) VALUES (?)";

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
    req.body.limited,
    req.body.space === "undefined" || req.body.space === "" ? 0 : req.body.space,
    req.body.faculty,
    req.body.course,
    req.body.free,
    req.body.price === "undefined" || req.body.space === "" ? 0 : req.body.price,
    req.body.dateAndTime,
    req.body.desc,
    req.user.id,
    req.body.location,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json({ message: "Inserting the post failed.", data: [] });
    const post_id = data.insertId;
    return res.status(200).json({ message: "", data: post_id });
  });
};

export const updateGroupPost = (req, res) => {
  const post_id = req.params.id;

  const q =
    "UPDATE group_posts SET `title`=?,`limited`=?,`max_inscriptions`=?,`faculty`=?,`course`=?,`free`=?, `price`=?, `date_time`=?, `description`=?, `userid`=?, `location`=? WHERE `id` = ?";

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
    req.body.limited,
    req.body.space === "undefined" || req.body.space === "" ? 0 : req.body.space,
    req.body.faculty,
    req.body.course,
    req.body.free,
    req.body.price === "undefined" || req.body.space === "" ? 0 : req.body.price,
    req.body.dateAndTime,
    req.body.desc,
    req.user.id,
    req.body.location,
    post_id,
  ];

  db.query(q, values, (err, data) => {
    if (err) return console.log(err);
    return res.status(200).json({ message: "", data: post_id });
  });
};

// delete a specific group post by providing its id
export const deleteGroupPost = (req, res) => {
  const post_id = req.params.id;

  //here happens validation to check that the user deletes its own post
  const q = "DELETE FROM group_posts WHERE `id` = ? AND userid = ?";

  //validation that the user is logged in
  if (typeof req.user === "undefined") {
    return res.status(401).json({ message: "You have to first log in!", data: [] });
  }

  console.log("helllo");

  // validation of provided information
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array().map((x) => x.msg), data: [] });
  }

  db.query(q, [post_id, req.user.id], (err, data) => {
    if (err) return res.status(500).json({ message: "Deleting group post failed.", data: [] });
    return res.status(200).json({ message: "Group post is deleted.", data: [] });
  });
};

// for the search functionality
export const findGroupPosts = (req, res) => {
  const keyword = req.query.keyword;
  const course = req.query.course;
  const field = req.query.field;
  const free = req.query.free;
  const noRegistration = req.query.noRegistration;
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
        order = "ORDER BY price ASC";
        break;
      case "Price high-low":
        order = "ORDER BY price DESC";
        break;
      case "Date new-old":
        order = "ORDER BY date_time ASC";
        break;
      case "Date old-new":
        order = "ORDER BY date_time DESC";
        break;
      case "Registrations high-low":
        order = "ORDER BY registrations DESC";
        break;
      case "Registrations low-high":
        order = "ORDER BY registrations ASC";
        break;
      default:
        order = "";
    }
    return order;
  };

  const checkFree = () => {
    if (free === "true") {
      return "AND free = 1";
    } else {
      return "";
    }
  };

  const checkNoRegistrattions = () => {
    if (noRegistration === "true") {
      return " AND limited = 0 ";
    } else {
      return "";
    }
  };

  const checkLimits = () => {
    // to prevent SQL injections
    if (startIdx !== undefined && endIdx !== undefined && parseInt(startIdx) !== NaN && parseInt(endIdx) !== NaN) {
      return ` LIMIT ${startIdx}, ${endIdx - startIdx}`;
    } else {
      return "";
    }
  };

  let posts;
  const values = ["%" + keyword + "%", "%" + course + "%", "%" + field + "%"];
  db.query(
    "SELECT * FROM group_posts WHERE description LIKE ? AND course LIKE ? AND faculty LIKE ?" +
      checkFree() +
      checkNoRegistrattions() +
      checkOrder() +
      checkLimits(),
    values,
    (err, data) => {
      if (err) return res.status(500).json({ message: "Fetching the amount of posts failed.", data: [] });
      posts = data;
    }
  );

  // we also provide the total amount of posts (can be used to determine pages for the pagination)
  let q2 = "SELECT COUNT(id) AS amount FROM group_posts WHERE description LIKE ? AND course LIKE ? AND faculty LIKE ? ";

  db.query(q2 + checkFree() + checkNoRegistrattions() + checkOrder() + checkLimits(), values, (err, data) => {
    if (err) return res.status(500).json({ message: "Fetching the amount of posts failed.", data: [] });

    return res.status(200).json({ message: "", data: { posts: posts, amount: data[0]?.amount } });
  });
};

// returns the total amount of group posts (can be used to determine the number of pages for the pagination)
export const getGroupPostsAmount = (req, res) => {
  let q = "SELECT COUNT(id) AS amount FROM group_posts";

  //validation that the user is logged in
  if (typeof req.user === "undefined") {
    return res.status(401).json({ message: "You have to first log in!", data: [] });
  }

  // validation of provided information
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array().map((x) => x.msg), data: [] });
  }

  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ message: "Fetching the amount of posts failed.", data: [] });

    return res.status(200).json({ message: "", data: data[0].amount });
  });
};

// REGISTRATIONS

// register the given student for the given session
export const signUpForSession = (req, res) => {
  const values = [req.body.student_id, req.body.post_id];

  //validation that the user is logged in
  if (typeof req.user === "undefined") {
    return res.status(401).json({ message: "You have to first log in!", data: [] });
  }

  // validation of provided information
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array().map((x) => x.msg), data: [] });
  }

  if (!req.body.signup) {
    const q = "DELETE FROM session_registrations WHERE `student_id` = ? AND `session_id` = ?";

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json({ message: "Unregistering the user for the session failed.", data: [] });
      return res.status(200).json({ message: "", data: [] });
    });
  } else {
    const q = "INSERT INTO session_registrations(`student_id`, `session_id`) VALUES (?)";

    db.query(q, [values], (err, data) => {
      if (err)
        return res.status(500).json({
          message: "Registering the user for the session failed. Possible reason: user is already registered.",
          data: [],
        });
      return res.status(200).json({ message: "", data: [] });
    });
  }
};

// Check whether the given student is signed up for the given session
export const is_signedUp = (req, res) => {
  const values = [req.query.student_id, req.query.post_id];

  let q = "SELECT COUNT(student_id) AS amount FROM session_registrations WHERE student_id = ? AND session_id = ?";

  //validation that the user is logged in
  if (typeof req.user === "undefined") {
    return res.status(401).json({ message: "You have to first log in!", data: [] });
  }

  // validation of provided information
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array().map((x) => x.msg), data: [] });
  }

  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Checking if user is registered failed.",
        data: [],
      });
    }
    return res.status(200).json({ message: "", data: data[0].amount > 0 }); // 'if not zero' is returned
  });
};

// Get the number of registrations for a specific post. Can be used to 
// let students know how much space there is left.
export const registrationCount = (req, res) => {
  const post_id = req.query.post_id;

  let q = "SELECT COUNT(student_id) AS amount FROM session_registrations WHERE session_id = ?";

  //validation that the user is logged in
  if (typeof req.user === "undefined") {
    return res.status(401).json({ message: "You have to first log in!", data: [] });
  }

  // validation of provided information
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array().map((x) => x.msg), data: [] });
  }

  db.query(q, post_id, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Fetching the count of registration for the given session failed.",
        data: [],
      });
    }
    console.log(data[0].amount);
    return res.status(200).json({ message: "", data: data[0].amount });
  });
};
