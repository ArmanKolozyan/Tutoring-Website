
import cors from "cors";
import passport from "passport";
import bcrypt from "bcryptjs"; // for hashing the password
import { db } from "./db.js";


// Routes for user register, login and logout handling.
export const authRoutes = (app, passport) => {

    app.post(
        "/login",
        passport.authenticate("local", {
          failureRedirect: "/login",
          failureMessage: true,
        }),
        function (req, res) {
          res.send(req.user);
        }
      );
      
      app.post("/register", (req, res) => {
        //CHECK EXISTING USER
        const q = "SELECT * FROM users WHERE email = ? OR username = ?";
      
        db.query(q, [req.body.email, req.body.username], (err, data) => {
          if (err) res.status(500).json(err);
          if (data.length) return res.status(409).json("User already exists!");
      
          const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
          bcrypt.genSalt(10, (err, salt) => { // salting the password
            bcrypt.hash(req.body.password, salt, function (err, hash) { // hashing the password 
              const values = [req.body.username, req.body.email, hash];
              db.query(q, [values], (err, data) => {
                if (err) throw res.status(500).json(err);
                return res.status(200).json("User has been created.");
              });
            });
          });
        });
      });
      
      
      app.get("/user", (req, res) => {
        res.send(req.user);
      });
      
      app.post('/logout', function(req, res, next){
        req.logout(function(err) {
          if (err) { return next(err); }
          res.send("logged out");
        });
      });




}