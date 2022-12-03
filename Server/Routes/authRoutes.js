import {
  getUser,
  getUserStudies,
  login,
  logOut,
  register,
} from "../Controllers/authentication.js";
import { updateUser, uploadImage } from "../Controllers/users.js";
import multer from "multer";

// TO DO:
// https://express-validator.github.io/docs/ gebruiken voor server-side validation
// Client-side validation toevoegen

// Routes for user register, login and logout handling.
export const authRoutes = (app, passport) => {
  app.post(
    "/login",
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureMessage: true,
    }),
    login
  );

  app.post("/register", register);

  app.get("/user", getUser);

  app.post("/logout", logOut);

  app.get("/studies/:id", getUserStudies);

  app.post("/update", updateUser);

  app.get("/giveuser", login);

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
