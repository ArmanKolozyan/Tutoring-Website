import bcrypt from "bcryptjs"; // for hashing the password
import { db } from "../db.js";

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
    if (data.length) return res.status(409).json({message: "The provided e-mail already exists!", data: []});

    const q1 = "INSERT INTO users(`firstname`, `lastname`, `email`,`password`, `birthDate`) VALUES (?)";
    bcrypt.genSalt(10, (err, salt) => {
      // salting the password
      bcrypt.hash(password, salt, function (err, hash) {
        // hashing the password
        const values = [firstName, lastName, email, hash, birthDate];
        db.query(q1, [values], (err, data) => {
          if (err) throw res.status(500).json({message: "Adding the user failed.", data: []});
          return res.status(200).json({message: "User is registered.", data: []});
        });
      });
    });
  });
};

export const getUser = (req, res) => {
  res.status(200).json({message: "", data: req.user});
};

export const logOut = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return res.status(500).json({message: "Logging out failed.", data: []});
    }
    res.status(200).json({message: "User is logged out.", data: []});
  });
};
