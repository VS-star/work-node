var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer  = require('multer');

router.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
router.use(bodyParser.json())
var Upload = require('./Friend');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/avatar') 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})
  
var upload_avatar = multer({ storage: storage })

// SAVE the friend info upload

router.post('/save', upload_avatar.single('avatar_file'), function (req, res) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any

  Upload.create({
    name : req.body.name,
    email : req.body.email,
    number : req.body.number,
    people : req.body.people,
    avatar : req.file.filename
  }, 
  function (err) {
    if (err) return res.status(500).send("There was a problem registering the user`.");

    // if user is registered without errors
    // create a token
    res.status(200).send("successfully saved");
  });

});
    
module.exports = router;








