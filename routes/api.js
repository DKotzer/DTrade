const express = require("express");

const router = express.Router();

//Import API controller
const apiCntrl = require("../controllers/api");

//Routes
router.get("/api/memes", apiCntrl.api_memes_get);

module.exports = router;
