// import { db } from "./db.js";
// import bcrypt from "bcryptjs";
// import passportLoc from "passport-local";
// const localStrategy = passportLoc.Strategy;


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
    console.log("AIGHT");
    process.nextTick(function() {
      return cb(null, user.id);
    });
  });
  
  passport.deserializeUser(function(id, cb) {
    console.log("EINNDEELIJK");
    db.query('SELECT * FROM users WHERE id = ?', [ id ], function(err, user) {
      if (err) { return cb(err); }
      return cb(null, user);
    });
  });
};






//export const config = (passport) => {
//    console.log(passport);
//    console.log("yup");
//  passport.use(
//    new localStrategy((username, password, done) => {
//      const q = "SELECT * FROM users WHERE username = ?";
//      db.query(q, [username], async (err, data) => {
//        if (err) res.status(500).json(err);
//        if (!data.length) return done(null, false);
//
//        // check password
//        bcrypt.compare(password, data[0].password, (err, result) => {
//          if (err) throw err; // VRAAG: mag dit? dit is geen JSON (?)
//          if (result === true) {
//            console.log("ALL GOOD");
//            return done(null, data[0]);
//          } else {
//            return done(null, false);
//          }
//        });
//      });
//    })
//  );
//
//  passport.serializeUser((user, done) => {
//    console.log("Whait, what?");
//    console.log(user.id);
//    done(null, user.id);
//  });
//
//  passport.deserializeUser((id, cb) => {
//    const q = "SELECT * FROM users WHERE id = ?";
//    console.log("WELCAM");
//
//    db.query(q, [id], async (err, data) => {
//      const userInformation = {
//        username: data[0].username,
//      };
//      cb(err, userInformation);
//    });
//  });
//};
//