import bcrypt from "bcryptjs"; // for hashing the password
import { db } from "../db.js";
import {check, validationResult} from 'express-validator';


/**
 * Registers the user given all the necessary information.
 */
export const register = (req, res) => {
  //CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE email = ?";

  // validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({message: errors.array().map(x => x.msg), data: []})
  }

  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;
  let birthDate = req.body.birthDate;
  let domain = email.split('@')[1];

  db.query(q, [req.body.email], (err, data) => {
    if (err) res.status(500).json({ message: "Something went wrong with registering the user.", data: [] });
    if (data.length) return res.status(409).json({ message: "The provided email already exists!", data: [] });
    console.log(domain)
    if (domain !== "vub.be") return res.status(500).json({ message: "The provided email is not a vub email!", data: [] })

    const q1 = "INSERT INTO users(`firstname`, `lastname`, `email`,`password`, `birthDate`) VALUES (?)";
    bcrypt.genSalt(10, (err, salt) => {
      // salting the password
      bcrypt.hash(password, salt, function (err, hash) {
        // hashing the password
        const values = [firstName, lastName, email, hash, birthDate];
        db.query(q1, [values], (err, data) => {
          if (err) throw res.status(500).json({ message: "Registering the user failed.", data: [] });
          return res.status(200).json({ message: "User is registered!", data: [] });
        });
      });
    });
  });
};

/**
 * Logs the user out.
 */
export const logOut = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return res.status(500).json({ message: "Logging out failed.", data: [] });
    }
    res.status(200).json({ message: "User is logged out.", data: [] });
  });
};
