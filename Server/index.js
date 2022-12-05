import express from "express";

import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser"; // to parse cookies for authentication
import session from "express-session";
import { config } from "./passportConfig.js";
import { authRoutes } from "./Routes/authRoutes.js";
import { tutoringPostRoutes } from "./Routes/tutoringPostRoutes.js";
import { groupPostRoutes } from "./Routes/groupPostRoutes.js";


const port = 8800;
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
tutoringPostRoutes(app);
groupPostRoutes(app);



// Routes

app.listen(port, () => {
  console.log("Hey Guys!");
});


