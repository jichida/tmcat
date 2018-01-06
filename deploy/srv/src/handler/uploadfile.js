const path = require('path');
const fs = require('fs');
const config = require('../config.js');
const formidable = require('formidable');
const util = require('util');

const getuploadfile = (req,callbackfn)=>{
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname,'../',config.uploaddir);
  let result = {};
  form.on('error', (err)=> {
         callbackfn(err,null);
       })
       .on('field', function(field, value) {
         result[field] = value;
       })
       .on('file', function(field, file) {
           let basename = path.basename(file.path);
           let extname = path.extname(file['name']);
           let filename = `${basename}${extname}`;

           fs.rename(`${file.path}`,`${file.path}${extname}`,(err)=>{
           });
           result['avatar'] = `${config.uploadurl}/${filename}`;
        })
       .on('end', function() {
         callbackfn(null,result);
       });
  form.parse(req);
};

module.exports= getuploadfile;
