var ccxt = require("ccxt");
// module.exports = { quote };
const { Account } = require("../models/Account");
const User = require("../models/User");
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
  let symbol = req.body.symbol;
  let shares = req.body.shares;
  // console.log("symbol " + symbol);
  let price = await quote(`${symbol}`);
  // console.log("price " + price);
  Account.findById(req.user.account)

    // .populate("user")
    .then((account) => {
      res.render("trade/buyquote", { price, account, symbol, shares });
    });
};

//to do: trade_quote_post that uses quote function on req.body.quote input and then render the page with price, then render the page with toal after shares is entered
