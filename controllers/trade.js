var ccxt = require("ccxt");
// module.exports = { quote };

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

quote("BTC");

exports.trade_buy_get = (req, res) => {
  res.render("trade/buy");
};

exports.trade_sell_get = (req, res) => {
  res.render("trade/sell");
};
exports.trade_quote_get = (req, res) => {
  res.render("trade/quote");
};
