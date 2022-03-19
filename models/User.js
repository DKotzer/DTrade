//dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true, //user cant use empty data for first Name
      minlength: [3, "First Name must be more than 3 characters"],
      maxlength: [99, "First Name must be less than 99 characters"],
    },
    lastName: {
      type: String,
      required: true, //user cant use empty data for first Name
      minlength: [3, "First Name must be more than 3 characters"],
      maxlength: [99, "First Name must be less than 99 characters"],
    },
    emailAddress: {
      type: String,
      required: true,
      lowercase: true, //converts everything to lowercase
      unique: true, //requires the email to be unique to database
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters"],
    },
    account: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
const User = mongoose.model("User", userSchema);

module.exports = User;
