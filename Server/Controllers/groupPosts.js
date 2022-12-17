import { db } from "../db.js";

export const getgroupPosts = (req, res) => {
  const q = "SELECT * FROM group_posts";

  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const getSinglegroupPost = (req, res) => {
  const q =
    "SELECT `id`, `title`, `limited`, `max_inscriptions`, `faculty`, `course`, `free`, `price`, `date_time`, `description`, `userid`, `location` FROM group_posts WHERE id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addgroupPost = (req, res) => {
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
    req.body.location
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("group post has been created.");
  });
};
