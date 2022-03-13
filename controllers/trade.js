var ccxt = require("ccxt");
// module.exports = { quote };
const { Account } = require("../models/Account");
const User = require("../models/User");
let { Position } = require("../models/Position");
const { validationResult } = require("express-validator");
const flash = require("connect-flash");
// console.log(ccxt.exchanges);

async function quote(ticker) {
  // let bitfinex = new ccxt.bitfinex();
  // let btcPrice = (bitfinex.id, await bitfinex.fetchTicker("BTC/USD"));
  let kraken = new ccxt.kraken();
  let price = (kraken.id, await kraken.fetchTicker(`${ticker}/USD`));
  console.log(`${ticker}/USD: ` + price.ask);
  return price.ask;
  // await res.render("trade/quote.ejs", { btcPrice: btcPrice });
}

// async function kraken() {
//   let kraken = new ccxt.kraken();
//   console.log(kraken.id, await kraken.fetchOrderBook());
// }

// kraken();

// quote("BTC");
exports.trade_buy_get = (req, res) => {
  Account.findById(req.user.account)
    // .populate("user")
    .then((account) => {
      res.render("trade/buy", { account });
    });
};
exports.trade_sell_get = (req, res) => {
  Account.findById(req.user.account)
    // .populate("user")
    .then((account) => {
      res.render("trade/sell", { account });
    });
};
exports.trade_quote_get = (req, res) => {
  res.render("trade/quote");
};

exports.trade_buy_quote_post = async (req, res) => {
  //array of acceptable values
  let stonks = [
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
  ];
  //check if req.body.symbol is in array  .includes  if(arr.includes()){}
  if (stonks.includes(`${req.body.symbol}`)) {
    let symbol = req.body.symbol;
    let shares = req.body.shares;
    // console.log("symbol " + symbol);
    let price = await quote(`${symbol}`);
    // console.log("price " + price);
    Account.findById(req.user.account)

      //up to here in includes function

      // .populate("user")
      .then((account) => {
        res.render("trade/buyquote", { price, account, symbol, shares });
      });
  } else {
    req.flash("error", "Email is already in use");
    res.render("trade/quote");
  }
  // let symbol = req.body.symbol;
  // let shares = req.body.shares;
  // // console.log("symbol " + symbol);
  // let price = await quote(`${symbol}`);
  // // console.log("price " + price);
  // Account.findById(req.user.account)

  //   //up to here in includes function

  //   // .populate("user")
  //   .then((account) => {
  //     res.render("trade/buyquote", { price, account, symbol, shares });
  //   });
};

exports.trade_sell_quote_post = async (req, res) => {
  let symbol = req.body.symbol;
  let shares = req.body.shares;
  // console.log("symbol " + symbol);
  let price = await quote(`${symbol}`);
  // console.log("price " + price);
  Account.findById(req.user.account)

    // .populate("user")
    .then((account) => {
      res.render("trade/sellquote", { price, account, symbol, shares });
    });
};

exports.trade_buy_submit_post = (req, res) => {
  // let symbol = req.body.symbol;
  // let shares = req.body.shares;
  // // console.log("symbol " + symbol);
  // let price = req.body.price;
  // console.log("price " + price);

  let position = new Position(req.body);
  position.save();
  Account.findById(req.user.account).then((account) => {
    account.cash -= req.body.value;
    account.maketValue = Number(account.marketValue);
    account.marketValue += Number(req.body.value);
    account.positions.push(position);
    let history = {
      symbol: req.body.symbol,
      price: req.body.price,
      shares: req.body.shares,
      value: req.body.value,
      trade: "buy",
    };
    account.history.push(history);
    account.save();
    res.redirect("/");
  });
};
//to do: trade_quote_post that uses quote function on req.body.quote input and then render the page with price, then render the page with toal after shares is entered
