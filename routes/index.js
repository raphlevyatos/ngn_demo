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
  var comment = req.body.comment
  res.redirect("/send/:" + email + "/:" + name + "/:" + comment);
});

router.get("/send/:email/:name/:comment", function(req, res) {
  var email_address = (req.params.email).substr(1);
  var name_customer = (req.params.name).substr(1);
  var comment_text = (req.params.comment).substr(1);
  fs.readFile('public/images/pipe.jpg', function(err, data) {
    sendgrid.send({
    to:       email_address,
    from:     'no-reply@ngn.co.uk',
    subject:  "Job #12345 - " + name_customer,
    files: [{filename: 'picture.jpg', content: data}],
    text:     comment_text
    }, function(err, json) {
    console.log(err);
    if (err) { return res.send("Error!"); }
    res.render("results");
    });
  });
});

module.exports = router;