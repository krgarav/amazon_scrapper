const express = require("express");
const router = express.Router();
const homeController = require('../Controller/Home');

router.get("/getdata", homeController.getSearchQuery);

module.exports = router;