var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    Mailgun = require('mailgun-js');

var indexRoutes      = require("./routes/index");
    // detailRoutes     = require("./routes/details");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use("/", indexRoutes);

app.listen(3000, function() {
    console.log("server has started");
});
