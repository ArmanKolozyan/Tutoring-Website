import express from "express";

import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser"; // to parse cookies for authentication
import session from "express-session";
import { config } from "./passportConfig.js";
import { authRoutes } from "./authentication.js";


const app = express(); // to have web server


app.use(express.json()); // to send data to the database
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // location of the react app
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
config(passport);
authRoutes(app, passport);


// Routes

app.listen(8800, () => {
  console.log("Hey Guys!");
});


