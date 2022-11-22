import { getUser, login, logOut, register } from "../Controllers/authentication.js";

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
};
