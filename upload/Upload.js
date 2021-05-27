var mongoose = require('mongoose');  
var UploadSchema = new mongoose.Schema({  
  video_name: String,
  title: String,
  description: String,
  upload_file_name:Array,
  upload_file_type:Array,
  upload_file_size:Array
});

mongoose.model('Upload', UploadSchema);

module.exports = mongoose.model('Upload');


