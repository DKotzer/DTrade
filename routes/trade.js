const express = require("express");

const isLoggedIn = require("../helper/isLoggedIn");

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

//import article controller
const tradeCntrl = require("../controllers/trade");

router.get("/trade/quote", isLoggedIn, tradeCntrl.trade_quote_get);

router.get("/trade/history", isLoggedIn, tradeCntrl.trade_history_get);

router.get("/trade/buy", isLoggedIn, tradeCntrl.trade_buy_get);

router.get("/trade/sell", isLoggedIn, tradeCntrl.trade_sell_get);

// router.get("/trade/buy:symbol", isLoggedIn, tradeCntrl.trade_buy_get_param);

router.get("/trade/sell:symbol", isLoggedIn, tradeCntrl.trade_sell_get_param);

router.post("/trade/sell/quote", isLoggedIn, tradeCntrl.trade_sell_quote_post);

router.post("/trade/buy/quote", isLoggedIn, tradeCntrl.trade_buy_quote_post);

router.post("/trade/buy/submit", isLoggedIn, tradeCntrl.trade_buy_submit_post);
router.post(
  "/trade/sell/submit",
  isLoggedIn,
  tradeCntrl.trade_sell_submit_post
);
module.exports = router;
