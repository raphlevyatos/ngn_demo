var express = require("express");
var router = express.Router();
var fs      = require("fs")
var sendgrid  = require('sendgrid')("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");

router.get("/", function(req, res){
    res.render("landing");
});

router.get("/details", function(req, res) {
    res.render("details");
});

router.post("/details", function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
});

router.get("/send", function(req, res) {
  fs.readFile('public/images/pipe.jpg', function(err, data) {
    sendgrid.send({
    to:       'raphael.levy@atos.net',
    from:     'no-reply@ngn.co.uk',
    subject:  'Job #12345',
    files: [{filename: 'pipe.jpg', content: data}],
    text:     'Job Description XXXXXXXX'
    }, function(err, json) {
    console.log(err);
    if (err) { return res.send("Error!"); }
    res.render("results");
    });
  });
});

module.exports = router;