var express         = require("express"),
    bodyParser      = require("body-parser"),
    Mailgun = require('mailgun-js'),
    path = require('path');

var app = new express();
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

var indexRoutes = require("./routes/index");

app.use("/", indexRoutes);

app.listen(process.env.PORT || 3000, function() {
    console.log("server has started");
});
