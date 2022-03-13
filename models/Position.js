const mongoose = require("mongoose");

const positionSchema = mongoose.Schema(
  {
    symbol: {
      type: String,
      enum: {
        values: [
          "BTC",
          "ETH",
          "DOGE",
          "XRP",
          "LUNA",
          "USDT",
          "USDC",
          "SOL",
          "ADA",
          "AVAX",
          "DOT",
          "UST",
          "SHIB",
          "MATIC",
          "DAI",
          "ATOM",
          "LTC",
          "LINK",
          "TRX",
          "UNI",
          "ALGO",
          "XLM",
          "XMR",
          "SAND",
          "WAVES",
          "XTZ",
          "ZEC",
          "EOS",
          "MKR",
          "ENJ",
          "DASH",
          "KSM",
          "BAT",
          "LRC",
          "ICX",
          "QTUM",
          "OMG",
          "ZRX",
          "STORJ",
          "SUSHI",
          "SC",
          "ANT",
          "REP",
          "NANO",
        ],
        message: "Symbol is not supported",
      },
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
  },
  {
    timestamps: true,
  }
);

const Position = mongoose.model("Position", positionSchema);
module.exports = { Position };
