var ccxt = require("ccxt");
// module.exports = { quote };
const { Account } = require("../models/Account");
const User = require("../models/User");
let { Position } = require("../models/Position");
const { validationResult } = require("express-validator");
const flash = require("connect-flash");
// console.log(ccxt.exchanges);

//external API function to get quote, can alter it to also get name of stock or do own filter
async function quote(ticker) {
  // let bitfinex = new ccxt.bitfinex();

  // let btcPrice = (bitfinex.id, await bitfinex.fetchTicker("BTC/USD"));
  let kraken = new ccxt.kraken();
  let price = (kraken.id, await kraken.fetchTicker(`${ticker}/USD`));
  console.log(`${ticker}/USD: ` + price.ask);
  return price.ask;
}

//HTTP GET trade/buy
exports.trade_buy_get = (req, res) => {
  Account.findById(req.user.account)
    // .populate("user")
    .then((account) => {
      res.render("trade/buy", { account });
    });
};
//HTTP GET trade/sell
exports.trade_sell_get = (req, res) => {
  Account.findById(req.user.account)
    .populate("positions")
    // .populate("user")
    .then((account) => {
      res.render("trade/sell", { account });
    });
};

//HTTP GET trade/quote - blank still
exports.trade_quote_get = (req, res) => {
  res.render("trade/quote");
};

//HTTP GET trade/history
exports.trade_history_get = (req, res) => {
  Account.findById(req.user.account)
    // .populate("user")
    .then((account) => {
      res.render("trade/history", { account });
    });
};

//HTTP POST trade/buy/quote
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
  //check if req.body.symbol is in array of acceptable symbols
  if (stonks.includes(`${req.body.symbol}`)) {
    let symbol = req.body.symbol;
    let shares = req.body.shares;
    // console.log("symbol " + symbol);
    let price = await quote(`${symbol}`);
    if (req.body.shares > 0) {
      Account.findById(req.user.account).then((account) => {
        res.render("trade/buyquote", { price, account, symbol, shares });
      });
    } else {
      Account.findById(req.user.account)
        .populate("positions")
        // .populate("user")
        .then((account) => {
          req.flash("error", "You cannot buy 0 or negative shares");
          res.redirect("back");
          // res.render("trade/buy", { account });
        });
    }
    // console.log("price " + price);
  } else {
    //error if unnacceptable symbol input but it only shows after 2nd time on onwards for some reason
    console.log("unacceptable symbol");
    Account.findById(req.user.account)
      .populate("positions")
      // .populate("user")
      .then((account) => {
        req.flash("error", "Please input a Valid Symbol");
        res.redirect("back");
        // res.render("trade/buy", { account });
      });
  }
};

//HTTP POST sell/quote/post
exports.trade_sell_quote_post = async (req, res) => {
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
      .populate("positions")

      // .populate("user")
      .then((account) => {
        res.render("trade/sellquote", { price, account, symbol, shares });
      });
  } else {
    req.flash("error", "Please input a Valid Symbol");
    Account.findById(req.user.account)
      .populate("positions")
      // .populate("user")
      .then((account) => {
        res.render("trade/sell", { account });
      });
  }
};

exports.trade_buy_submit_post = (req, res) => {
  Position.find({ account: req.user.account, symbol: req.body.symbol }).then(
    (existingPosition) => {
      //need help here, existingPosition is not updating
      console.log("existingPosition " + existingPosition);
      if (existingPosition != "") {
        console.log("existing shares before " + existingPosition[0].shares);
        existingPosition[0].shares += Number(req.body.shares);
        console.log("existing shares after " + existingPosition[0].shares);
        existingPosition[0].price = Number(req.body.price);
        existingPosition[0].value =
          (existingPosition[0].shares + req.body.shares) * req.body.price;

        Account.findById(req.user.account).then((account) => {
          account.cash -= req.body.value;
          account.maketValue = Number(account.marketValue);
          account.marketValue += Number(req.body.value);

          let history = {
            symbol: req.body.symbol,
            price: req.body.price,
            shares: req.body.shares,
            value: req.body.value,
            trade: "Buy",
          };
          account.history.push(history);
          account.save();
          res.redirect("/");
          existingPosition[0].save();
        });
      } else {
        //this is working, if no position exists, new one is made
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
            trade: "Buy",
          };
          account.history.push(history);
          account.save();
          res.redirect("/");
        });
      }
    }
  );
};

exports.trade_sell_submit_post = (req, res) => {
  Position.find({ account: req.user.account, symbol: req.body.symbol }).then(
    (existingPosition) => {
      let existingID = existingPosition[0]._id;
      //need help here, existingPosition is not updating
      console.log("existingPosition " + existingPosition);
      if (existingPosition != "") {
        // console.log("stringify " + JSON.stringify(existingPosition));
        // console.log("existingPosition " + existingPosition[0].shares);
        // console.log("existing shares before " + existingPosition[0].shares);
        existingPosition[0].shares -= Number(req.body.shares);
        // console.log("existing shares after " + existingPosition[0].shares);
        // console.log("existingPosition.shares after " + existingPosition.shares);
        existingPosition[0].price = Number(req.body.price);
        existingPosition[0].value =
          existingPosition[0].shares -
          Number(req.body.shares) * Number(req.body.price);
        existingPosition[0]
          .save()
          .then(() => {
            if (existingPosition[0].shares == 0) {
              console.log("existing position id2 " + existingPosition[0]._id);
              console.log("test2 " + existingPosition[0].shares);
              Position.findByIdAndDelete(existingPosition[0]._id)
                .then(console.log("deleted succesffully"))
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch();

        // console.log("existing position id" + existingPosition[0]._id);
        // console.log("test " + existingPosition[0].shares);
      }
      Account.findById(req.user.account).then((account) => {
        console.log("existing id " + existingID);
        console.log("account positions" + account.positions);
        for (i = 0; i < account.positions.length; i++) {
          console.log(account.positions[i]._id + " == " + existingID);

          if (account.positions[i]._id.toString() == existingID.toString()) {
            account.positions.splice(i, 1);
          }
        }
        account.cash += Number(req.body.value);
        account.maketValue = Number(account.marketValue);
        account.marketValue -= Number(req.body.value);
        account.totalValue = account.marketValue + account.cash;
        // attempted fix for crash on delete
        let history = {
          symbol: req.body.symbol,
          price: req.body.price,
          shares: req.body.shares,
          value: req.body.value,
          trade: "Sell",
        };
        account.history.push(history);
        account.save();
        res.redirect("/");
      });
    }
  );
};
//to do: trade_quote_post that uses quote function on req.body.quote input and then render the page with price, then render the page with toal after shares is entered
