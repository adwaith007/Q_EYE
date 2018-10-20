var mongoose= require('mongoose');
var fs= require('fs');
var multer =require('multer');
var path=require('path');
var express=require('express');
var router = express.router();

function runqEye(filepath){
    var spawn = require("child_process").spawn;
    var process = spawn('python',["./qEye.py", 
    filepath] ); 

    process.stdout.on('data', function(data) { 
        data=JSON.parse(data);
    } ) 


}

const storage = multer.diskStorage({
    destination: './public/images2process/',
    filename: function(req, file, cb){
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('picture');

function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Jpeg Images Only!');
    }
  }

  router.post('/sendimg', function(req,res){
    upload(req,res,function(err){
        if(err) throw err;
    });
  });

  module.exports= router;

