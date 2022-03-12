const mongoose = require("mongoose");

const accountSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    positions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Position",
      },
    ],
    cash: {
      type: Number,
      default: 10000,
    },
    marketValue: {
      type: Number,
      default: 0,
      //some fancy way of adding up all the values from all positions goes here
    },
    history: {
      type: Object,
    },
    totalValue: {
      type: Number,
      value: this.marketValue + this.cash,
      default: 10000,
    },
    number: {
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

const Account = mongoose.model("Account", accountSchema);
module.exports = { Account };
