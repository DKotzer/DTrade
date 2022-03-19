//imports
const express = require("express");

const isLoggedIn = require("../helper/isLoggedIn");

const router = express.Router();

//body parser
router.use(express.urlencoded({ extended: true }));

//controller
const tradeCntrl = require("../controllers/trade");

//routes
router.get("/trade/quote", isLoggedIn, tradeCntrl.trade_quote_get);

router.get("/trade/history", isLoggedIn, tradeCntrl.trade_history_get);

router.get("/trade/buy", isLoggedIn, tradeCntrl.trade_buy_get_query);
router.get("/trade/sell", isLoggedIn, tradeCntrl.trade_sell_get_query);

router.post("/trade/sell/quote", isLoggedIn, tradeCntrl.trade_sell_quote_post);

router.post("/trade/buy/quote", isLoggedIn, tradeCntrl.trade_buy_quote_post);

router.post("/trade/buy/submit", isLoggedIn, tradeCntrl.trade_buy_submit_post);
router.post(
  "/trade/sell/submit",
  isLoggedIn,
  tradeCntrl.trade_sell_submit_post
);

//exports
module.exports = router;
