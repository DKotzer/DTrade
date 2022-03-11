//dependencies

const express = require("express");

const router = express.Router();

//require Controller
const indexCntrl = require("../controllers/index");

// Routes
router.get("/", indexCntrl.index_get);

//export to other files
module.exports = router;
