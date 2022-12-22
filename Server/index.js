import express from "express";

import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser"; // to parse cookies for authentication
import session from "express-session";
import { config } from "./passportConfig.js";
import { authRoutes } from "./Routes/authRoutes.js";
import { tutoringPostRoutes } from "./Routes/tutoringPostRoutes.js";
import { groupPostRoutes } from "./Routes/groupPostRoutes.js";
import { reviewRoutes } from "./Routes/reviewRoutes.js";
import { createClient } from 'redis';
import connectRedis from 'connect-redis';
import dotenv from 'dotenv'
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const port = 8800;
const app = express(); // to have web server


//Configure session middleware
dotenv.config()
const SESSION_SECRET = process.env.SESSION_SECRET;

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
   cookie: {
     secure: false,  // if true only transmits cookie over HTPPS
     httpOnly: false, // if true prevents client side JS from reading the cookie
     maxAge: 1000 * 60 * 100, // session max age in milliseconds
   },
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
app.use("/doc", express.static(__dirname + "/doc"));
config(passport);




authRoutes(app, passport);
tutoringPostRoutes(app);
groupPostRoutes(app);
reviewRoutes(app);




// Routes

app.listen(port, () => {
  console.log("Server is running");
});


