import express from "express";

const app = express(); // to have web server
import cors from "cors";
import passport from "passport";
import passportLoc from "passport-local";
const passportLocal = passportLoc.Strategy; // for local authentication
import cookieParser from "cookie-parser"; // to parse cookies for authentication
import bcrypt from "bcryptjs"; // for hashing the password
import session from "express-session";
import {db} from "./db.js";

app.use(express.json()); // to send data to the database
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // location of the react app
    credentials: true,
  })
);

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));



// Routes
app.post("/login", (req, res) => {
  console.log(req.body);
});
app.post("/register", (req, res) => {
  console.log(req.body);
  //CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) throw err;
    if (data.length) return res.send("User already exists!");

    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, req.body.password];

    console.log("CORRECT");
    console.log(values);
    db.query(q, [values], (err, data) => {
      if (err) throw err;
      return res.send("User has been created.");
    });
  });
});
app.get("/user", (req, res) => {
  res.send(req.user); // The req.user contains the entire user information
});

app.listen(8800, () => {
  console.log("Hey Guys!");
});
