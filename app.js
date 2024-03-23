const express = require("express");
const bodyParser = require("body-parser");
const homeRoute = require("./Routes/homeRoute.js");
const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(homeRoute);

app.listen(6000, () => {
    console.log("Server  is running on port 6000")
})
