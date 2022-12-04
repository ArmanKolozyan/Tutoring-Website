import { db } from "../db.js";

export const getPosts = (req, res) => {
  const q = "SELECT * FROM posts";

  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getSinglePost = (req, res) => {
  const q =
    "SELECT p.id, `course`, `field_of_study`, `description`, `date`, `experience`, `price`, `free_test`, p.uid, u.firstname FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  // here we should check authentication

  const q =
    "INSERT INTO posts(`course`, `field_of_study`, `description`, `date`, `uid`, `experience`, `price`, `free_test`) VALUES (?)";

  const values = [
    req.body.course,
    req.body.field,
    req.body.desc,
    req.body.date,
    req.user[0].id,
    req.body.exp,
    req.body.price,
    req.body.test,
  ];


  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Post has been created.");
  });
};
