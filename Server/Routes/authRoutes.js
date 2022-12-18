import { getUser, logOut, register, login } from "../Controllers/authentication.js";
import { getSingleUser, updateUser, uploadImage, getUserStudies } from "../Controllers/users.js";
import multer from "multer";


export const authRoutes = (app, passport) => {
  
// Routes for user register, login and logout handling.
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  login
);
/* 
  app.post("/login", function (req, res, next) {
    passport.authenticate(
      "local",
      {
        failureMessage: true,
      },
      (err, user, info) => {
        if (err) {
          res.status(500).json({ message: "Logging in failed.", data: [] });
        }
        if (!user) {
          return res.status(401).json({ message: info.message, data: [] }); // passport js will always provide a more detailed message than we can
        }
        res.status(200).json({ message: "", data: user });
      }
    )(req, res, next);
  }); */

  app.post("/register", register);

  app.post("/logout", logOut);

  app.get("/studies/:id", getUserStudies);

  app.put("/users/:id", updateUser);

  app.get("/user/:id", getSingleUser);

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
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
