// This code is based entirely on the code found in the PassportJS documentation. 
// For more information see: https://www.passportjs.org/concepts/authentication/password/


import { db } from "./db.js";
import bcrypt from "bcryptjs";
import LocalStrategy from "passport-local";

export const config = (passport) => {
  passport.use(new LocalStrategy(function verify(username, password, cb) {
    db.query('SELECT * FROM users WHERE username = ?', [ username ], function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }
  
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) { return cb(err); }
        if (result === true) {
          return cb(null, user[0]);
        }
        return cb(null, false, { message: 'Incorrect username or password.' });
      });
    });
  }));

  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user.id);
    });
  });
  
  passport.deserializeUser(function(id, cb) {
    db.query('SELECT * FROM users WHERE id = ?', [ id ], function(err, user) {
      if (err) { return cb(err); }
      return cb(null, user);
    });
  });
};






