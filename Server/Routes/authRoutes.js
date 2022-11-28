import { getUser, getUserStudies, login, logOut, register } from "../Controllers/authentication.js";
import { updateUser } from "../Controllers/users.js";

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
};
