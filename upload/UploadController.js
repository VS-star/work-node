var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer  = require('multer');


router.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
router.use(bodyParser.json())
var Upload_media = require('./Upload');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/media') 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})
  
 var upload = multer({ storage: storage })


// SAVE the file info upload

router.post('/save', upload.fields([{ name: 'upload_file', maxCount: 12 }, { name: 'upload_video', maxCount: 1 }]), function (req, res) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  let isSuccess = true;
  var file_name =[];
  var file_type =[];
  var file_size = [];
  for(var i = 0; i < req.files['upload_file'].length; i++){
    file_name.push({val:i,upload_file_name:req.files['upload_file'][i].filename});
    file_type.push({val:i,upload_file_type:req.files['upload_file'][i].mimetype});
    file_size.push({val:i,upload_file_size:req.files['upload_file'][i].size});
  }
    Upload_media.create({
      title:req.body.title,
      description:req.body.description,
      video_name:req.files['upload_video'][0].filename,
      upload_file_name:file_name,
      upload_file_type:file_type,
      upload_file_size:file_size,
    },
      function (err) {
        if (err)
          isSuccess = false;
      }
    );
    if (!isSuccess) 
      res.status(500).send("error happend.");
    else
      res.status(200).send("successfully saved");
});

module.exports = router;




