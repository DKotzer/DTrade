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
//this function is being held together by a bandaid, keeping debugging code here for now
exports.index_get = async (req, res) => {
  Account.findById(req.user.account)
    .populate("positions")
    .then(async (account) => {
      // console.log(account.positions);
      //look up each position and update values/totals
      let newMarketValue = [];
      account.positions.forEach(async function (position) {
        let price = await quote(`${position.symbol}`);
        // console.log(`${position.symbol} price before: ` + position.price);
        position.price = Number(price);
        // console.log(`${position.symbol} price after: ` + position.price);
        position.value = Number(price) * Number(position.shares);
        position.save();
        // console.log("position value " + position.value);
        newMarketValue.push(position.value);
        // console.log("newMarketValue: " + newMarketValue);
        // console.log("account MarketValue update: " + account.marketValue);
        // console.log("total Value: " + account.totalValue);
        // console.log("new market value :" + newMarketValue);
        account.marketValue = newMarketValue.reduce((a, b) => a + b, 0);
        // console.log(account.marketValue);

        account.totalValue = account.marketValue + account.cash;
        account
          .save()
          .then()
          .catch((err) => {
            console.log(
              "This is a triumph! I'm making a note here: 'Huge success'"
              //this catch is the bandaid holding back app breaking errors, do not remove
            );
            res.render("/home/index", { account });
          });
      });
      account.save();
      res.render("home/index", { account });
    });
};
// SocketIO Chat
exports.chat = (req, res) => {
  Account.findById(req.user.account)
    .populate("user")
    .then((account) => {
      let name = account.user.firstName;
      res.render("home/chat", { name });
    })
    .catch();
};
