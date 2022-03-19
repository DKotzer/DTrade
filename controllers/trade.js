var ccxt = require("ccxt");
const { Account } = require("../models/Account");
const User = require("../models/User");
let { Position } = require("../models/Position");
const { validationResult } = require("express-validator");
const flash = require("connect-flash");

//external API function to get quote
async function quote(ticker) {
  let kraken = new ccxt.kraken();
  let price = (kraken.id, await kraken.fetchTicker(`${ticker}/USD`));
  console.log(`${ticker}/USD: ` + price.ask);
  return price.ask;
}
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
];

//HTTP BUY GET for both query and non query
exports.trade_buy_get_query = (req, res) => {
  Account.findById(req.user.account)
    .populate("positions")
    .then((account) => {
      //below 4 lines are for handling the buy drop down option on the account summary page
      let symbol = req.query.symbol;
      if (!symbol) {
        symbol = "Symbol";
      }
      res.render("trade/buy", { account, symbol });
    });
};

//HTTP SELL GET for both query and non query
exports.trade_sell_get_query = (req, res) => {
  Account.findById(req.user.account)
    .populate("positions")
    .then((account) => {
      //below 4 lines are for handling the sell drop down option on the account summary page
      let symbol = req.query.symbol;
      if (!symbol) {
        symbol = "Symbol";
      }
      res.render("trade/sell", { account, symbol });
    });
};

//HTTP GET trade/quote - blank still
exports.trade_quote_get = (req, res) => {
  res.render("trade/quote");
};

//HTTP GET trade/history
exports.trade_history_get = (req, res) => {
  Account.findById(req.user.account).then((account) => {
    res.render("trade/history", { account });
  });
};

//HTTP POST trade/buy/quote
exports.trade_buy_quote_post = async (req, res) => {
  //checks if req.body.symbol is in array of acceptable symbols
  if (stonks.includes(`${req.body.symbol}`)) {
    let symbol = req.body.symbol;
    let shares = req.body.shares;
    let price = await quote(`${symbol}`);
    if (req.body.shares > 0) {
      Account.findById(req.user.account).then((account) => {
        res.render("trade/buyquote", { price, account, symbol, shares });
      });
    } else {
      Account.findById(req.user.account)
        .populate("positions")
        .then((account) => {
          req.flash("error", "You cannot buy 0 or negative shares");
          res.redirect("back");
        });
    }
  } else {
    console.log("unacceptable symbol");
    Account.findById(req.user.account)
      .populate("positions")
      .then((account) => {
        req.flash("error", "Please input a Valid Symbol");
        res.redirect("back");
      });
  }
};

//HTTP POST sell/quote/post
exports.trade_sell_quote_post = async (req, res) => {
  //check if req.body.symbol is in array
  if (stonks.includes(`${req.body.symbol}`)) {
    let symbol = req.body.symbol;
    let shares = req.body.shares;
    let price = await quote(`${symbol}`);
    Account.findById(req.user.account)
      .populate("positions")
      .then((account) => {
        Position.find({
          account: req.user.account,
          symbol: req.body.symbol,
        }).then((existingPosition) => {
          if (existingPosition[0].shares < req.body.shares) {
            console.log("existing Position not enough deteced");
            req.flash("error", "You cannot sell more shares than you own");
            res.redirect("back");
          } else {
            res.render("trade/sellquote", { price, account, symbol, shares });
          }
        });
      });
  } else {
    req.flash("error", "Please input a Valid Symbol");
    Account.findById(req.user.account)
      .populate("positions")
      .then((account) => {
        res.render("trade/sell", { account });
      });
  }
};

//second favorite function
exports.trade_buy_submit_post = (req, res) => {
  Position.find({ account: req.user.account, symbol: req.body.symbol }).then(
    (existingPosition) => {
      if (existingPosition != "") {
        existingPosition[0].shares += Number(req.body.shares);
        existingPosition[0].price = Number(req.body.price);
        existingPosition[0].value =
          (existingPosition[0].shares + Number(req.body.shares)) *
          Number(req.body.price);

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
        //Create CRUD example
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

//favorite function -- read/update/delete CRUD
exports.trade_sell_submit_post = (req, res) => {
  Position.find({ account: req.user.account, symbol: req.body.symbol }).then(
    (existingPosition) => {
      //store existingPosition[0]._id in a variable to use in case existingPosition[0] is deleted
      let existingID = existingPosition[0]._id;
      if (existingPosition != "") {
        //if existing position is not the placeholder, update existing position
        existingPosition[0].shares -= Number(req.body.shares);
        existingPosition[0].price = Number(req.body.price);
        existingPosition[0].value =
          (existingPosition[0].shares - Number(req.body.shares)) *
          Number(req.body.price);
        existingPosition[0]
          .save()
          .then(() => {
            //find account and update account info
            Account.findById(req.user.account).then((account) => {
              account.cash += Number(req.body.value);
              account.maketValue = Number(account.marketValue);
              account.marketValue -= Number(req.body.value);
              account.totalValue = account.marketValue + account.cash;
              //create a history object and push it to account.history
              let history = {
                symbol: req.body.symbol,
                price: req.body.price,
                shares: req.body.shares,
                value: req.body.value,
                trade: "Sell",
              };
              account.history.push(history);
              account.save();
            });
            //needed to move below if function after the .then to stop it from deleting positions that are above 0 shares
            if (existingPosition[0].shares == 0) {
              //Here is my DELETE CRUD operation, it exists! If position exists and after selling position.shares =0, delete position
              Position.findByIdAndDelete(existingPosition[0]._id)
                .then(() => {
                  Account.findById(req.user.account).then((account) => {
                    for (i = 0; i < account.positions.length; i++) {
                      if (
                        account.positions[i]._id.toString() ==
                        existingID.toString()
                      ) {
                        //splice removes the positon from account DB object, without this it would still show up in account.positions even though the position db object is deleted
                        account.positions.splice(i, 1);
                      }
                    }
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch();
        res.redirect("/");
      }
    }
  );
};
