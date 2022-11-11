import express from "express";

const app = express(); // to have web server
import cors from "cors";
import passport from "passport";
import passportLoc from "passport-local";
const localStrategy = passportLoc.Strategy; // for local authentication
import cookieParser from "cookie-parser"; // to parse cookies for authentication
import bcrypt from "bcryptjs"; // for hashing the password
import session from "express-session";
import { db } from "./db.js";
import { config } from "./passportConfig.js";

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
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
config(passport);

// Routes
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  function (req, res) {
    res.redirect("/~" + req.user.username);
  }
);

app.post("/register", (req, res) => {
  //CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    console.log("donita");
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        const values = [req.body.username, req.body.email, hash];
        db.query(q, [values], (err, data) => {
          if (err) throw res.status(500).json(err);
          console.log("donito");
          return res.status(200).json("User has been created.");
        });
      });
    });
  });
});

globalThis.app = app;

app.get("/user", (req, res) => {
  console.log("faynayte");
  console.log(req.user);
  console.log("finito");
  res.send(req.user);
});

app.listen(8800, () => {
  console.log("Hey Guys!");
});
