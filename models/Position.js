const mongoose = require("mongoose");

const positionSchema = mongoose.Schema(
  {
    symbol: {
      type: String,
      ref: "User",
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Position",
    },
    price: {
      type: Number,
    },
    shares: {
      type: Number,
    },
    originalPrice: {
      type: Number,
    },
    value: {
      type: Number,
      value: this.price * this.shares,

      //some fancy way of adding up all the values from all positions goes here
    },
    totalValue: {
      type: Number,
      value: this.marketValue + this.cash,
      default: 10000,
    },
  },
  {
    timestamps: true,
  }
);

const Position = mongoose.model("Position", positionSchema);
module.exports = { Position };
