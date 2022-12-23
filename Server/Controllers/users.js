import { db } from "../db.js";
import imageSize from "image-size";
import fs from "fs";
import path from "path";
import {check, validationResult} from 'express-validator';



export const getSingleUser = (req, res) => {
  const q = "SELECT * FROM users WHERE id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json({ message: "Fetching user with the given id failed.", data: [] });

    return res.status(200).json({ message: "", data: data[0] });
  });
};

export const updateUser = (req, res) => {
  const q = `UPDATE users SET firstname = ?, lastname = ?, birthDate = ?, intro = ?, shortIntro = ? WHERE id = ?`;


  // validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({message: errors.array().map(x => x.msg), data: []})
  }


  if (typeof req.user === 'undefined') {
    return res.status(401).json({ message: "You have to first log in!", data: [] })
  } 


  const updateStudies = (studies) => {
    const q1 = `DELETE FROM followed_fields WHERE uid = ?`;
    const q2 = "INSERT INTO followed_fields SET uid = ?, field = ?";

    db.query(q1, [req.user.id], (err, data) => {
      if (err) return ({ message: "Updating the studies failed.", data: [] });
    });

    studies.forEach((x) =>
      db.query(q2, [req.user.id, x.value], (err, data) => {
        if (err) return ({ message: "Inserting the studies failed.", data: [] });
      })
    );
    return { message: "", data: [] }
  };


  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.birthdate.slice(0, 10),
    req.body.intro,
    req.body.shortIntro,
    req.user.id,
  ];

  const studiesUpdate = updateStudies(req.body.studies)
  if (studiesUpdate.message.length > 0) {
  }
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json({ message: "Updated the user information failed.", data: [] });
    return res.status(200).json({ message: "User information has been updated", data: [] });
  });
};

// to remove the image given its path (needed when image dimensions too big)
const clearImage = (filePath) => {
  const __dirname = path.resolve();
  filePath = path.join(__dirname, "../images/", filePath);
  fs.unlink(filePath, (err) => {
  });
};

// Checking dimension of the image, and if it is not too big we update it
// based on: https://stackoverflow.com/a/57981123
export const UpdateProfilePicture = (req, res) => {
  if (typeof req.file !== "undefined") {
    const image = req.file.filename;
    const dimensions = imageSize("../client/public/uploads/" + image);
    if (dimensions.width > 600 || dimensions.height > 600) {
      // check if image size too big
      const path = req.file.path; // too big => delete image
      clearImage(path);
      return res.status(500).json({ message: "Image dimension is too big.", data: [] })
    } else {
      // image size is fine => add to database
      const q = `UPDATE users SET img = ? WHERE id = ?`;
      const values = [image, req.user.id];
      db.query(q, values, (err, data) => {
        if (err) res.status(500).json({ message: "Updating the image failed.", data: [] });
        return res.status(200).json({ message: "", data: image });
      });
    }
  }
};

export const getUserStudies = (req, res) => {
  const q = "SELECT `field` FROM followed_fields WHERE uid = ? ";

    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({message: errors.array().map(x => x.msg), data: []})
    }

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json({ message: "Fetching the studies failed.", data: [] });
    return res.status(200).json({ message: "", data: data });
  });
};
