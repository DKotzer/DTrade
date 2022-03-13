const express = require("express");

const isLoggedIn = require("../helper/isLoggedIn");

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

//import article controller
const tradeCntrl = require("../controllers/trade");

router.get("/trade/quote", isLoggedIn, tradeCntrl.trade_quote_get);
// router.post("/trade/quote", tradeCntrl.trade_quote_post);

router.get("/trade/buy", isLoggedIn, tradeCntrl.trade_buy_get);
// router.post("/trade/buy", tradeCntrl.trade_buy_post);

router.get("/trade/sell", isLoggedIn, tradeCntrl.trade_sell_get);
// router.post("/trade/sell", tradeCntrl.trade_sell_post);

router.post(
  "/trade/sell/quote",
  //   [body("symbol")
  //     .is
  // ],
  isLoggedIn,
  tradeCntrl.trade_sell_quote_post
);

router.post(
  "/trade/buy/quote",
  //   [body("symbol")
  //     .is
  // ],
  isLoggedIn,
  tradeCntrl.trade_buy_quote_post
);

router.post("/trade/buy/submit", isLoggedIn, tradeCntrl.trade_buy_submit_post);
module.exports = router;
