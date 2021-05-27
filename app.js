var express = require('express');
var app = express();
var cors = require('cors')
var db = require('./db');
global.__root   = __dirname + '/'; 

app.use(cors(
  {
    origin: true,
    credentials: true,
  }
));

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

var UserController = require(__root + 'user/UserController');
app.use('/api/users', UserController);

var AuthController = require(__root + 'auth/AuthController');
app.use('/api/auth', AuthController);

var FriendController = require(__root + 'friend/FriendController');
app.use('/api/friend', FriendController);

var UploadController = require(__root + 'upload/UploadController');
app.use('/api/upload', UploadController);

module.exports = app;