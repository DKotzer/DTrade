//dependencies

const express = require("express");

const router = express.Router();

//require Controller
const indexCntrl = require("../controllers/index");
const isLoggedIn = require("../helper/isLoggedIn");
// Routes
router.get("/", isLoggedIn, indexCntrl.index_get);
router.get("/chat", isLoggedIn, indexCntrl.chat);

//export to other files
module.exports = router;
