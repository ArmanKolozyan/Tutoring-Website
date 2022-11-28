// This code is based entirely on the code found in the PassportJS documentation.
// For more information see: https://www.passportjs.org/concepts/authentication/password/

import { db } from "./db.js";
import bcrypt from "bcryptjs";
import LocalStrategy from "passport-local";

export const config = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      function verify(email, password, cb) {
        db.query(
          "SELECT * FROM users WHERE email = ?",
          [email],
          function (err, user) {
            if (err) {
              return cb(err);
            }
            if (user.length == 0) {
              return cb(null, false, {
                message: "Incorrect email or password.",
              });
            }

            bcrypt.compare(password, user[0].password, (err, result) => {
              if (err) {
                return cb(err);
              }
              if (result === true) {
                return cb(null, user[0]);
              }
              return cb(null, false, {
                message: "Incorrect email or password.",
              });
            });
          }
        );
      }
    )
  );

  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user.id);
    });
  });

  passport.deserializeUser(function (id, cb) {
    db.query("SELECT * FROM users WHERE id = ?", [id], function (err, user) {
      if (err) {
        return cb(err);
      }
      return cb(null, user);
    });
  });
};
