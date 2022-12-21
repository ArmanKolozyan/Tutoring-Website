import { db } from "../db.js";

export const getGroupPosts = (req, res) => {
  let q = "SELECT * FROM group_posts";
  const startIdx = req.query.start;
  const endIdx = req.query.end;

  if (startIdx !== undefined && endIdx !== undefined && parseInt(startIdx) !== NaN && parseInt(endIdx) !== NaN) {
    q = `SELECT * FROM group_posts LIMIT ${startIdx}, ${endIdx - startIdx}`;
  }

  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ message: "Fetching all group posts failed.", data: [] });
    return res.status(200).json({ message: "", data: data });
  });
};

export const getSingleGroupPost = (req, res) => {
  const q =
    "SELECT `id`, `title`, `limited`, `max_inscriptions`, `faculty`, `course`, `free`, `price`, `date_time`, `description`, `userid`, `location` FROM group_posts WHERE id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json({ message: "Fetching the specified group post failed.", data: [] });

    return res.status(200).json({ message: "", data: data[0] });
  });
};

export const addGroupPost = (req, res) => {
  // here we should check authentication

  const q =
    "INSERT INTO group_posts(`title`, `limited`, `max_inscriptions`, `faculty`, `course`, `free`, `price`, `date_time`, `description`, `userid`, `location`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.limited,
    req.body.space,
    req.body.faculty,
    req.body.course,
    req.body.free,
    req.body.price,
    req.body.dateAndTime,
    req.body.desc,
    req.user[0].id,
    req.body.location,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json({ message: "Inserting the given group post failed.", data: [] });
    const post_id = data.insertId;
    return res.status(200).json({ message: "", data: post_id });
  });
};

export const updateGroupPost = (req, res) => {
  const post_id = req.params.id;

  const q =
    "UPDATE group_posts SET `title`=?,`limited`=?,`max_inscriptions`=?,`faculty`=?,`course`=?,`free`=?, `price`=?, `date_time`=?, `description`=?, `userid`=?, `location`=? WHERE `id` = ?";

  const values = [
    req.body.title,
    req.body.limited,
    req.body.space,
    req.body.faculty,
    req.body.course,
    req.body.free,
    req.body.price,
    req.body.dateAndTime,
    req.body.desc,
    req.user[0].id,
    req.body.location,
    post_id,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json({ message: "Updating the group post failed.", data: [] });
    return res.status(200).json({ message: "", data: post_id });
  });
};

export const deleteGroupPost = (req, res) => {
  const post_id = req.params.id;

  const q = "DELETE FROM group_posts WHERE `id` = ?";

  db.query(q, [post_id], (err, data) => {
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
      return "AND limited = 0";
    } else {
      return "";
    }
  };

  const checkLimits = () => {
    if (startIdx !== undefined && endIdx !== undefined && parseInt(startIdx) !== NaN && parseInt(endIdx) !== NaN) {
      return `LIMIT ${startIdx}, ${endIdx - startIdx}`;
    } else {
      return "";
    }
  };

  const values = ["%" + keyword + "%", "%" + course + "%", "%" + field + "%"];
  db.query(
    "SELECT * FROM group_posts WHERE description LIKE ? AND course LIKE ? AND faculty LIKE ?" +
      checkFree() +
      checkNoRegistrattions() +
      checkOrder() +
      checkLimits(),
    values,
    (err, data) => {
      if (err) return res.status(500).json({ message: "Finding the group posts failed.", data: [] });
      return res.status(200).json({ message: "", data: data });
    }
  );
};

export const getGroupPostsAmount = (req, res) => {
  let q = "SELECT COUNT(id) AS amount FROM group_posts";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ message: "Fetching the amount of posts failed.", data: [] });

    return res.status(200).json({ message: "", data: data[0].amount });
  });
};

// REGISTRATIONS

export const signUpForSession = (req, res) => {
  const values = [req.body.student_id, req.body.session_id];

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

export const is_signedUp = (req, res) => {
  const values = [req.query.student_id, req.query.session_id];

  let q = "SELECT COUNT(student_id) AS amount FROM session_registrations WHERE student_id = ? AND session_id = ?";

  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Checking if user is registered failed.",
        data: [],
      });
    }
    return res.status(200).json({ message: "", data: data[0].amount > 0 }); // if not zero
  });
};

export const registrationCount = (req, res) => {
  const session_id = req.query.session_id;

  let q = "SELECT COUNT(student_id) AS amount FROM session_registrations WHERE session_id = ?";

  db.query(q, session_id, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Fetching the count of registration for the given session failed.",
        data: [],
      });
    }
    return res.status(200).json({ message: "", data: data[0].amount });
  });
};
