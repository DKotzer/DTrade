const axios = require("axios");

const baseURL = "https://api.imgflip.com";

//API to call memes from third party api
exports.api_memes_get = (req, res) => {
  axios({
    method: "get",
    url: baseURL + "/get_memes",
    // headers: {'APIKEY': '234234234234'}//key/value go in here for paid apis
  })
    .then((response) => {
      //   console.log(response.data.data.memes);
      res.render("api/api.ejs", { data: response.data.data.memes });
    })
    .catch((error) => {
      console.log(error);
    });
};

// var ccxt = require("ccxt");
// // module.exports = { quote };

// // console.log(ccxt.exchanges);

// async function quote(ticker) {
//   // let bitfinex = new ccxt.bitfinex();
//   // let btcPrice = (bitfinex.id, await bitfinex.fetchTicker("BTC/USD"));
//   let kraken = new ccxt.kraken();
//   let price = (kraken.id, await kraken.fetchTicker(`${ticker}/USD`));
//   console.log(`${ticker}/USD: ` + price.ask);
//   // await res.render("trade/quote.ejs", { btcPrice: btcPrice });
// }

// quote("BTC");
// (async function priceCheck(ticker) {
//   // let bitfinex = new ccxt.bitfinex();
//   // let btcPrice = (bitfinex.id, await bitfinex.fetchTicker("BTC/USD"));
//   let kraken = new ccxt.kraken();
//   let price = (kraken.id, await kraken.fetchTicker(`${ticker}/USD`));
//   console.log(`${ticker}/USD: ` + price.ask);
// })();

// (async function priceCheck(req, res) {
//   // let bitfinex = new ccxt.bitfinex();
//   // let btcPrice = (bitfinex.id, await bitfinex.fetchTicker("BTC/USD"));
//   let kraken = new ccxt.kraken();
//   let btcPrice = (kraken.id, await kraken.fetchTicker(`BTC/USD`));
//   let ethPrice = (kraken.id, await kraken.fetchTicker(`ETH/USD`));
//   console.log(`BTC/USD: ` + btcPrice.ask);
//   console.log(`ETH/USD: ` + ethPrice.ask);
// })();
