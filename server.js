//Dependencies
const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
require("dotenv").config();

// Port Configuration
const PORT = process.env.PORT;

//Initialize Express Appliation
const app = express();

// look for static files(like css/image/audio/js/etc files) in public folder
app.use(express.static("public"));

//body parser, password entry doesnt work without it
app.use(express.urlencoded({ extended: true }));

const expressLayouts = require("express-ejs-layouts");

// Look into views folder, for a file named as layout.ejs
app.use(expressLayouts);

let session = require("express-session");
let passport = require("./helper/ppConfig");

app.use(
  session({
    secret: process.env.secret,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 360000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

// Sharing the information/session id with all pages
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});

//Import Routes

const indexRoute = require("./routes/index");
const authRoute = require("./routes/auth");
const tradeRoute = require("./routes/trade");
const apiRoutes = require("./routes/api");

//Mount Routes
app.use("/", indexRoute);
app.use("/", authRoute);
app.use("/", apiRoutes);
app.use("/", tradeRoute);

// tell NodeJS to look in a folder called views for all ejs files
app.set("view engine", "ejs");

//connection with mongoDB - will create the database if it doesn't exist
mongoose.connect(
  process.env.mongoDBURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("mongodb connected successfully!");
  }
);

//not sure if the listen does something or its just logging the port to console
app.listen(PORT, () => console.log(`App is using port: ${PORT}`));
