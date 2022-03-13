//API's

const { Account } = require("../models/Account");
const User = require("../models/User");
// var ccxt = require("ccxt");
//conver this in to a function to check all tickers in index, or call this function for all tickers in index
// async function quotes(ticker) {
//   // let bitfinex = new ccxt.bitfinex();
//   // let btcPrice = (bitfinex.id, await bitfinex.fetchTicker("BTC/USD"));
//   let kraken = new ccxt.kraken();
//   let price = (kraken.id, await kraken.fetchTicker(`${ticker}/USD`));
//   console.log(`${ticker}/USD: ` + price.ask);
//   return price.ask;
//   // await res.render("trade/quote.ejs", { btcPrice: btcPrice });
// }

exports.index_get = (req, res) => {
  Account.findById(req.user.account)
    .populate("positions")
    // .populate("user")
    .then((account) => {
      res.render("home/index", { account });
    });
};
//render instad of send, related to bellow comment
//above function works because of this line in server.js routes app.set("view engine", "ejs"); or else would need the full path ../views/home/index.js
