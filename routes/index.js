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

router.get("/details", function(req, res) {
    res.render("details");
});

router.post("/details", multer({ dest: './uploads/'}).single('displayImage'), function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var comment = req.body.comment;
  var displayImage = req.body.displayImage;
  console.log(name);
  console.log(email);
  console.log(comment);
  console.log(displayImage);
  console.log(req.file);
  console.log(req.file.path);
  fs.readFile(req.file.path, function(err, data) {
    sendgrid.send({
    to:       email,
    from:     'no-reply@ngn.co.uk',
    subject:  "Job #12345 - " + name,
    files: [{filename: "image", content: data}],
    text:     comment
    }, function(err, json) {
    console.log(err);
    if (err) { return res.send("Error!"); }
    res.render("results");
    });
  });
});

// router.get("/send/:email/:name/:comment/:imgsrc", function(req, res) {
//   var email_address = (req.params.email).substr(1);
//   var name_customer = (req.params.name).substr(1);
//   var comment_text = (req.params.comment).substr(1);
//   var imgsrc_text = (req.params.imgsrc).substr(1);
//   fs.readFile(imgsrc, function(err, data) {
//     sendgrid.send({
//     to:       email_address,
//     from:     'no-reply@ngn.co.uk',
//     subject:  "Job #12345 - " + name_customer,
//     files: [{filename: 'picture.jpg', content: data}],
//     text:     comment_text
//     }, function(err, json) {
//     console.log(err);
//     if (err) { return res.send("Error!"); }
//     res.render("results");
//     });
//   });
// });

module.exports = router;