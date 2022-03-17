//Dependencies
const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
require("dotenv").config();

const { instrument } = require("@socket.io/admin-ui");
const socket = require("socket.io");

// Port Configuration
const PORT = process.env.PORT;

//Initialize Express Application
const app = express();

// look for static files(like css/image/audio/js/etc files) in public folder
app.use(express.static("public"));

//body parser, password entry doesn't work without it
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
    cookie: { maxAge: 3600000000 },
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

//Mount Routes
app.use("/", indexRoute);
app.use("/", authRoute);
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
const server = app.listen(PORT, () =>
  console.log(`App is using port: ${PORT}`)
);

app.get("/chat", (req, res) => {
  res.sendFile(__dirname + "/home/index");
});

// Socket setup
const io = socket(server)({
  cors: {
    origin: ["https://dcrypto-app.herokuapp.com", "https://admin.socket.io"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

io.emit("some event", {
  someProperty: "some value",
  otherProperty: "other value",
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
});

instrument(io, { auth: false });
