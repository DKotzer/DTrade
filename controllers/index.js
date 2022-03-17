//API's

const { Account } = require("../models/Account");
let { Position } = require("../models/Position");
const User = require("../models/User");
var ccxt = require("ccxt");
// convert this in to a function to check all tickers in index, or call this function for all tickers in index
async function quote(ticker) {
  // let bitfinex = new ccxt.bitfinex();
  // let btcPrice = (bitfinex.id, await bitfinex.fetchTicker("BTC/USD"));
  let kraken = new ccxt.kraken();
  let price = (kraken.id, await kraken.fetchTicker(`${ticker}/USD`));
  console.log(`${ticker}/USD: ` + price.ask);
  return price.ask;
  // await res.render("trade/quote.ejs", { btcPrice: btcPrice });
}

//this function goes through every position and updates all the data in database + and recalculates account totals
exports.index_get = async (req, res) => {
  Account.findById(req.user.account)
    .populate("positions")
    .then(async (account) => {
      console.log(account.positions);
      //look up each position and update values/totals
      let newMarketValue = [];
      account.positions.forEach(async function (position) {
        let price = await quote(`${position.symbol}`);
        // console.log(`${position.symbol} price before: ` + position.price);
        position.price = Number(price);
        // console.log(`${position.symbol} price after: ` + position.price);
        position.value = price * position.shares;
        // console.log("position value " + position.value);
        newMarketValue.push(position.value);
        position.save();
        account.marketValue = newMarketValue.reduce((a, b) => a + b, 0);
        // console.log("account MarketValue update: " + account.marketValue);
        account.totalValue = account.marketValue + account.cash;

        // console.log("new market value :" + newMarketValue);
      });
      account.save();
      res.render("home/index", { account });
    });
};

exports.chat = (req, res) => {
  res.render("home/chat");
};
