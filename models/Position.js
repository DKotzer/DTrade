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
          "ENJ",
          "KIN",
          "FIL",
          "GRT",
          "AAVE",
          "KSM",
          "COMP",
          "ANKR",
          "BNT",
          "KNC",
          "LSK",
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
    },
  },
  {
    timestamps: true,
  }
);

const Position = mongoose.model("Position", positionSchema);
module.exports = { Position };
