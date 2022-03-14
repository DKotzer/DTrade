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

// async function quotes([]) {
//   // let bitfinex = new ccxt.bitfinex();
//   // let btcPrice = (bitfinex.id, await bitfinex.fetchTicker("BTC/USD"));
//   let kraken = new ccxt.kraken();
//   let price = (kraken.id, await kraken.fetchTicker(`${ticker}/USD`));
//   console.log(`${ticker}/USD: ` + price.ask);
//   return price.ask;
//   // await res.render("trade/quote.ejs", { btcPrice: btcPrice });
// }

exports.index_get = async (req, res) => {
  Account.findById(req.user.account)
    .populate("positions")
    .then(async (account) => {
      //look up each position and update values/totals
      let newMarketValue = [];
      account.positions.forEach(async function (position) {
        let price = await quote(`${position.symbol}`);
        console.log(`${position.symbol} price before: ` + position.price);
        position.price = Number(price);
        console.log(`${position.symbol} price after: ` + position.price);
        position.value = price * position.shares;
        console.log("position value " + position.value);
        newMarketValue.push(position.value);
        position.save();
        account.marketValue = newMarketValue.reduce((a, b) => a + b, 0);
        console.log("account MarketValue update: " + account.marketValue);
        account.totalValue = account.marketValue + account.cash;
        account.save();
        console.log("new market value :" + newMarketValue);
      });
      // console.log("new market value out of for Each:" + newMarketValue);
      // account.totalValue = newMarketValue.reduce((a, b) => a + b, 0);
      // account.save();
      //for each position, holderVar += position.value
      //marketValue = holderVar
      //totalValue = buying power + marketValue
      res.render("home/index", { account });
    });
};
