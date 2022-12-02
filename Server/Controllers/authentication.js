import bcrypt from "bcryptjs"; // for hashing the password
import { db } from "../db.js";

export const login = (req, res) => {
  res.json(req.user); // Res json ({user: req.user, error: .....}) zo'n soort object errond zetten
};

export const register = (req, res) => {
  //CHECK EXISTING USER 
  const q = "SELECT * FROM users WHERE email = ?";

  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;
  let birthDate = req.body.birthDate;
  //let fieldOfStudy = req.body.fieldOfStudy;

  db.query(q, [req.body.email], (err, data) => {
    if (err) res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    const q1 = "INSERT INTO users(`firstname`, `lastname`, `email`,`password`, `birthDate`) VALUES (?)";
    bcrypt.genSalt(10, (err, salt) => {
      // salting the password
      bcrypt.hash(password, salt, function (err, hash) {
        // hashing the password
        const values = [firstName, lastName, email, hash, birthDate];
        db.query(q1, [values], (err, data) => {
          if (err) throw res.status(500).json(err);
          return res.status(200).json("User has been created.");
        });
      });
    });
  });
};

export const getUser = (req, res) => {
  res.send(req.user);
};

export const logOut = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send("logged out");
  });
};


export const getUserStudies = (req, res) => {
  const q =
    "SELECT `field` FROM followed_fields WHERE uid = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
