import { logOut, register } from "../Controllers/authentication.js";
import { getSingleUser, updateUser, UpdateProfilePicture, getUserStudies } from "../Controllers/users.js";
import multer from "multer";
import { check, param } from "express-validator";

export const userRoutes = (app, passport) => {
  /**
   * @api {post} /login Log in the user
   * @apiName login
   * @apiGroup Users
   * @apiParam {String} email Email that the user filled in
   * @apiParam {String} password Password that the user filled in
   *
   *
   * @apiSuccess {Object} result Object containing (possibly empty) data and a (possibly empty) message
   * @apiSuccess {String} result.message Message containing the return message (error)
   * @apiSuccess {Object} result.data data containing the return value
   * @apiSuccess {Number} result.data.id  id of the user
   * @apiSuccess {Number} result.data.firstname  firstname of the user
   * @apiSuccess {Number} result.data.lastname  lastname of the user
   * @apiSuccess {Number} result.data.email  email of the user
   * @apiSuccess {Number} result.data.password  password of the user (hashed and salted)
   * @apiSuccess {Number} result.data.birthDate  birthDate of the user
   * @apiSuccess {Number} result.data.intro  intro of the user
   * @apiSuccess {Number} result.data.shortIntro  shortIntro of the user
   * @apiSuccess {Number} result.data.img  img of the user
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
   * @apiParam {String} firstName first name
   * @apiParam {String} lastName last name
   * @apiParam {String} email email of the user
   * @apiParam {String} password password of the user (hashed and salted)
   * @apiParam {Date} birthDate Birthdate of the User
   * 
   * @apiSuccess {Object} result Object containing (possibly empty) data and a (possibly empty) message
   * @apiSuccess {String} result.message Message containing the return message (error)
   * @apiSuccess {Object} result.data data containing the return value: here always empty  
   */
  app.post(
    "/register",
    [
      check("firstName").notEmpty().withMessage("username cannot be empty "),
      check("email").notEmpty().withMessage("email cannot be empty "),
      check("lastName").notEmpty().withMessage("lastname cannot be empty "),
      check("password").notEmpty().withMessage("password cannot be empty "),
      check("birthDate").notEmpty().withMessage("birthDate cannot be empty "),
    ],
    register
  );

  /**
   * @api {post} /logout Logs the user out.
   * @apiName logout
   * @apiGroup Users
   * 
   * @apiSuccess {Object} result Object containing (possibly empty) data and a (possibly empty) message
   * @apiSuccess {String} result.message Message containing the return message (error)
   * @apiSuccess {Object} result.data data containing the return value: here always empty  
   */
  app.post("/logout", logOut);

  /**
   * @api {get} /studies Logs the user out.
   * @apiName getUserStudies
   * @apiGroup Users
   * 
   * @apiParam {Number} id id of the user
   * 
   * @apiSuccess {Object} result Object containing (possibly empty) data and a (possibly empty) message
   * @apiSuccess {String} result.message Message containing the return message (error)
   * @apiSuccess {Object[]} result.data list of field of studies
   * @apiSuccess {String} result.data.field field of study of the tutor  
   */
  app.get("/studies/:id", param("id").notEmpty().withMessage("id of the user cannot be empty "), getUserStudies);

  /**
   * @api {put} /users Logs the user out.
   * @apiName updateUser
   * @apiGroup Users
   * @apiParam {Number} id id of the user
   * @apiParam {String} firstName first name
   * @apiParam {String} lastName last name
   * @apiParam {Date} birthdate birthdate of the user
   * @apiParam {String} intro intro of the user about itself
   * @apiParam {String} shortIntro short intro of the user about itself
   * 
   * @apiSuccess {Object} result Object containing (possibly empty) data and a (possibly empty) message
   * @apiSuccess {String} result.message Message containing the return message (error)
   * @apiSuccess {Object} result.data data containing the return value: here always empty 
   * 
   */
  app.put(
    "/users/:id",
    [
      check("firstName").notEmpty().withMessage("username cannot be empty "),
      check("lastName").notEmpty().withMessage("lastname cannot be empty "),
      check("birthdate").notEmpty().withMessage("birthdate cannot be empty "),
      check("intro").notEmpty().withMessage("birthDate cannot be empty "),
      check("shortIntro").notEmpty().withMessage("birthDate cannot be empty "),
      check("id").notEmpty().withMessage("user id cannot be empty "),
    ],
    updateUser
  );

  /**
   * @api {pgetut} /users Gives back the user with the provided id.
   * @apiName getSingleUser
   * @apiGroup Users
   * @apiParam {Number} id id of the user
   * 
   * @apiSuccess {Object} result Object containing (possibly empty) data and a (possibly empty) message
   * @apiSuccess {String} result.message Message containing the return message (error)
   * @apiSuccess {Object} result.data data containing the return value
   * @apiSuccess {Number} result.data.id  id of the user
   * @apiSuccess {Number} result.data.firstname  firstname of the user
   * @apiSuccess {Number} result.data.lastname  lastname of the user
   * @apiSuccess {Number} result.data.email  email of the user
   * @apiSuccess {Number} result.data.password  password of the user (hashed and salted)
   * @apiSuccess {Number} result.data.birthDate  birthDate of the user
   * @apiSuccess {Number} result.data.intro  intro of the user
   * @apiSuccess {Number} result.data.shortIntro  shortIntro of the user
   * @apiSuccess {Number} result.data.img  img of the user
   */

  app.get("/users/:id", getSingleUser);

  /// Profile picture upload using Multer

  // filters the files for upload
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

  const maxFileSizeBytes = 1024 * 1024 * 5;
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: maxFileSizeBytes,
    },
    fileFilter: fileFilter,
  });

  /**
   * @api {pgetut} /users Gives back the user with the provided id.
   * @apiName UpdateProfilePicture
   * @apiGroup Users
   * @apiParam {Number} id id of the user
   * 
   * @apiSuccess {Object} result Object containing (possibly empty) data and a (possibly empty) message
   * @apiSuccess {String} result.message Message containing the return message (error)
   * @apiSuccess {String} result.data name of the uploaded file
   * 
   */
  app.post("/users/profilePicture/:id", upload.single("file"), UpdateProfilePicture);
};
