import { db } from "../db.js";

export const getGroupPosts = (req, res) => {
  const q = "SELECT * FROM group_posts";

  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const getSingleGroupPost = (req, res) => {
  const q =
    "SELECT `id`, `title`, `limited`, `max_inscriptions`, `faculty`, `course`, `free`, `price`, `date_time`, `description`, `userid`, `location` FROM group_posts WHERE id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
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
    if (err) return res.status(500).json(err);
    const post_id = data.insertId;
    return res.json(post_id);
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
    if (err) return res.status(500).json(err);
    return res.status(200).json(post_id);
  });
};

export const deleteGroupPost = (req, res) => {
  const post_id = req.params.id;

  const q = "DELETE FROM group_posts WHERE `id` = ?";

  db.query(q, [post_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Post is deleted!");
  });
};

// for the search functionality
export const findGroupPosts = (req, res) => {
  const keyword = req.query.keyword;
  const course = req.query.course;
  const field = req.query.field;
  const free = req.query.free;
  const noRegistration = req.query.noRegistration;

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
console.log(free)
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

  const values = ["%" + keyword + "%", "%" + course + "%", "%" + field + "%"];
  db.query(
    "SELECT * FROM group_posts WHERE description LIKE ? AND course LIKE ? AND faculty LIKE ?" +
      checkFree() +
      checkNoRegistrattions() +
      checkOrder(),
    values,
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    }
  );
};
