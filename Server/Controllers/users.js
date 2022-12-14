import { db } from "../db.js";
import multer from "multer";

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

  const updateStudies = (studies) => {
    const q1 = `DELETE FROM followed_fields WHERE uid = ?`;
    const q2 = "INSERT INTO followed_fields SET uid = ?, field = ?";

    db.query(q1, [req.user[0].id], (err, data) => {
      if (err) return res.status(500).json(err);
    });

    studies.forEach((x) =>
      db.query(q2, [req.user[0].id, x.value], (err, data) => {
        if (err) return res.status(500).json(err);
      })
    );
  };

  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.birthdate.slice(0, 10),
    req.body.intro,
    req.body.shortIntro,
    req.user[0].id,
  ];

  updateStudies(req.body.studies);
  db.query(q, values, (err, data) => {
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

export const uploadImage = (req, res) => {
  if (typeof req.file !== 'undefined') { // VRAAG: MAAR IK HEB EEN CALLBACK GEZET BIJ FOUTE FILENAME, WAAROM KOMT HET TOCH NOG TOT HIER?
  const image = req.file.filename;
  const q = `UPDATE users SET img = ? WHERE id = ?`;
  const values = [image, req.user[0].id]
  db.query(q, values, (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json(image);
  });
}
};

export const getUserStudies = (req, res) => {
  const q =
    "SELECT `field` FROM followed_fields WHERE uid = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
