var express = require("express");
var multer  = require('multer');
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();
var fs      = require("fs");
var sendgrid  = require('sendgrid')("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");

var upload = multer({ dest: './uploads/' });

router.get("/", function(req, res){
    res.render("landing");
});

router.post("/", function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    res.redirect("/details/" + name + "/" + email);
});

router.get("/details/:email/:name", function(req, res) {
    var email = req.params.email;
    var name = req.params.name;
    res.render("details", {email, name});
});

router.post("/details", multer({ dest: './uploads/'}).single('displayImage'), function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var comment = req.body.comment;
  fs.readFile(req.file.path, function(err, data) {
    sendgrid.send({
    to:       email,
    from:     'no-reply@ngn.co.uk',
    subject:  "Job #12345 - " + name,
    files: [{filename: req.file.originalname, content: data}],
    text:     comment
    }, function(err, json) {
    if (err) { return res.send("Error!"); }
    res.render("results");
    });
  });
});


module.exports = router;