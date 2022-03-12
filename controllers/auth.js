//APIS for Authentication
// const { User } = require("../models/User");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const salt = 10;
const { validationResult } = require("express-validator");
const { Account } = require("../models/Account");

//HTTP Get - load sign up form

exports.auth_signup_get = (req, res) => {
  res.render("auth/signup");
};

//HTTP Post - post sign up form data

exports.auth_signup_post = (req, res) => {
  let user = new User(req.body);
  let hash = bcrypt.hashSync(req.body.password, salt);
  console.log(hash);
  user.password = hash;
  //create a new account when a new user is created and link them via Ids
  let account = new Account();
  account.user = user._id;

  account.save();

  user
    .save()
    .then(() => {
      res.redirect("/auth/signin");
    })
    .catch((err) => {
      if (err.code == 11000) {
        req.flash("error", "Email is already in use");
        res.redirect("/auth/signin");
      } else {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          req.flash("validationErrors", errors.errors);
        }
        res.redirect("/auth/signup");
      }
    });
};

//HTTP Get - Sign in - to load the signin form
exports.auth_signin_get = (req, res) => {
  res.render("auth/signin");
};

//HTTP Post - Sign in - post the sign in form data
exports.auth_signin_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/signin",
  failureFlash: "Invalid Login Info",
  successFlash: "You are logged in successfully",
});

//HTTP Get - Logout - to logout the user

exports.auth_logout_get = (req, res) => {
  //This will clear the session
  req.logout();
  req.flash("success", "You are successfully logged out");
  res.redirect("/auth/signin");
};
