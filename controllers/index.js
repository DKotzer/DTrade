//API's

const { Account } = require("../models/Account");
const User = require("../models/User");

exports.index_get = (req, res) => {
  Account.findById(req.user.account)
    // .populate("user")
    .then((account) => {
      res.render("home/index", { account });
      console.log("account: " + account);
    });
};
//render instad of send, related to bellow comment
//above function works because of this line in server.js routes app.set("view engine", "ejs"); or else would need the full path ../views/home/index.js
