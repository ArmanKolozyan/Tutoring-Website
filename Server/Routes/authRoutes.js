import { getUser, logOut, register } from "../Controllers/authentication.js";
import { getSingleUser, updateUser, uploadImage, getUserStudies } from "../Controllers/users.js";
import multer from "multer";


export const authRoutes = (app, passport) => {
  
  // login with a callback to be able to handle erros manually in our way
  // based on https://stackoverflow.com/a/15711502
app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      res.status(500).json({ message: "Authentication failed.", data: [] });
    }
    if (! user) {
      return res.status(500).json({ message: "Wrong email or password", data: [] });
    }
    req.login(user, loginErr => {
      if (loginErr) {
        return res.status(500).json({ message: "Authentication failed.", data: [] });;
      }
      return res.send({ message : "", data : req.user });
    });      
  })(req, res, next);
});

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

  const maxSize = 1024 * 1024 * 5
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: maxSize,
    },
    fileFilter: fileFilter,
  });

  app.post("/profilePicture/:id", upload.single("file"), uploadImage);
};
