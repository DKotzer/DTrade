//API's

exports.index_get = (req, res) => {
  res.render("home/index", { welcomeMessage: "Welcome to DTrade App" });
};
//render instad of send, related to bellow comment
//above function works because of this line in server.js routes app.set("view engine", "ejs"); or else would need the full path ../views/home/index.js
