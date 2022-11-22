import bcrypt from "bcryptjs"; // for hashing the password
import { db } from "../db.js";

export const login = (req, res) => {
  res.send(req.user);
};

export const register = (req, res) => {
  //CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    bcrypt.genSalt(10, (err, salt) => {
      // salting the password
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        // hashing the password
        const values = [req.body.username, req.body.email, hash];
        db.query(q, [values], (err, data) => {
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
