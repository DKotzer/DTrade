//middleware for user to check
module.exports = (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/signin");
  } else {
    next();
  }
};
