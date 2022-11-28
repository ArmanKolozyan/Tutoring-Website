import { db } from "../db.js";

export const getUsers = (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getSingleUser = (req, res) => {
  const q = "SELECT * FROM users WHERE id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const updateUser = (req, res) => {
  const q = `UPDATE users SET firstname = ?, lastname = ?, birthDate = ?, intro = ?, shortIntro = ? WHERE id = ?`;

  console.log("uuuuuu");
  console.log(req.user);

  console.log(
    req.body.firstName,
    req.body.lastName,
    req.body.birthdate,
    req.body.intro,
    req.body.shortIntro,
  )

  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.birthdate,
    req.body.intro,
    req.body.shortIntro,
    req.user[0].id,
  ];

  db.query(q, values, (err, data) => {
    if (err) console.log(err);
    if (err) return res.status(500).json(err);
    return res.json("User has been updated.");
  });
};

// this need to be brought into authentication.js when front-end is ready
export const insertUser = (req, res) => {
  const q =
    "INSERT INTO users SET firstname = ?, lastname = ?, birthDate = ?, email = ?, password = ?";

  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.birthDate,
    req.body.email,
    // password, (given in authentication.js)
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("User has been registered.");
  });
};

// vraag aan Maxim hoe gevolgde richtingen best updaten

// for the search functionality
export const findUser = (req, res) => {
  const keyword = req.body.search;
  // User the connection
  connection.query(
    "SELECT * FROM users WHERE firstname LIKE ? OR lastname LIKE ?",
    ["%" + keyword + "%", "%" + keyword + "%"],
    (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    }
  );
};
