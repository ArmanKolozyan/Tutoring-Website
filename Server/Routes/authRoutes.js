import { getUser, logOut, register } from "../Controllers/authentication.js";
import { getSingleUser, updateUser, uploadImage, getUserStudies } from "../Controllers/users.js";
import multer from "multer";

export const authRoutes = (app, passport) => {
  /**
   * @api {post} /login Log in the user
   * @apiName login
   * @apiGroup Users
   * @apiParam {String} email
   *  @apiParam {String} password
   */

  // login with a callback to be able to handle erros manually in our way
  // based on https://stackoverflow.com/a/15711502
  app.post("/login", function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        res.status(500).json({ message: "Authentication failed.", data: [] });
      }
      if (!user) {
        return res.status(500).json({ message: "Wrong email or password", data: [] });
      }
      req.login(user, (loginErr) => {
        if (loginErr) {
          return res.status(500).json({ message: "Authentication failed.", data: [] });
        }
        return res.send({ message: "", data: req.user });
      });
    })(req, res, next);
  });

  /**
   * @api {post} /register Register the user
   * @apiName register
   * @apiGroup Users
   * @apiParam {String} first name
   *  @apiParam {String} last name
   * @apiParam {String} email of the user
   * @apiParam {String} password
   */

  app.post("/register", register);

    /**
   * @api {post} /logout Register the user
   * @apiName logout
   * @apiGroup Users
   */

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
      fileSize: 1024 * 1024 * 50,
    },
    fileFilter: fileFilter,
  });

  app.post("/profilePicture/:id", upload.single("file"), uploadImage);
};
