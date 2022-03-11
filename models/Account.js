const mongoose = require("mongoose");

const accountSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    cash: {
      type: Number,
      default: 10000,
    },
    marketValue: {
      type: Number,
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
    account: {
      type: Number,
      default: Math.round(
        Math.random() * (9999999999999 - 123456791011 + 1) + 1
      ),
    },
    //userRole: {
    //   type: String,
    //   enum: ["admin", "regular", "SuperAdmin"],
    //   default: "regular",
    // }
  },
  {
    timestamps: true,
  }
);
