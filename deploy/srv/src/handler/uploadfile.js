const path = require('path');
const fs = require('fs');
const config = require('../config.js');
const formidable = require('formidable');
const util = require('util');

const getuploadfile = (req,callbackfn)=>{
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname,'../',config.uploaddir);

  form.parse(req, (err, fields, files)=> {
    console.log('file name:' + util.inspect({fields: fields, files: files}));
    console.log('file name:' + files['file'].path);
    let basename = path.basename(files['file'].path);
    let extname = path.extname(fields['filename']);
    let filename = basename + extname;
    fs.rename(files['file'].path,files['file'].path+extname,(err)=>{
      if(!!err){
        callbackfn(err,null);
      }
      else{
        callbackfn(null,{url:`${config.uploadurl}/${filename}`});
      }
    });

  });

  form.on('progress', (bytesReceived, bytesExpected)=> {
    console.log('已接受:' + bytesReceived);
    console.log('一共:' + bytesExpected);
  });
};

module.exports= getuploadfile;
