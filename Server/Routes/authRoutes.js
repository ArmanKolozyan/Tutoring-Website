import {
  getUser,
  login,
  logOut,
  register,
} from "../Controllers/authentication.js";
import { getSingleUser, updateUser, uploadImage, getUserStudies} from "../Controllers/users.js";
import multer from "multer";

// Routes for user register, login and logout handling.
export const authRoutes = (app, passport) => {
  
  app.post(
    "/login",
    passport.authenticate("local", {
      failureMessage: true,
    },
    (err, user, options) => {
      console.log(err)
      console.log(options)
      console.log(user) // options will be the complete object you pass in done()
  })
  );

  app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return res.status(500).json({message: "Logging in failed.", data: []}); }
      if (!user) { 
          return res.status(401).json({message: "Authentication failed.", data: []});
      }
          return res.status(200).json({message: "", data: req.user}); 
    })(req, res, next);
  });

  app.post("/register", register);

  app.post("/logout", logOut);

  app.get("/studies/:id", getUserStudies);

  app.put("/users/:id", updateUser);

  app.get("/user/:id", getSingleUser);

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client/public/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.fieldname);
    },
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
  });

  app.post("/profilePicture/:id", upload.single("file"), uploadImage);
};
