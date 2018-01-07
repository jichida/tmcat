const fs = require('fs');
const config = require('../config.js');
const uuid = require('uuid');
const path = require('path');

const getbase64file = (req,callbackfn)=>{
  const actiondata = req.body;
  // console.log(actiondata);
  const base64Data = actiondata.pngimageData.replace(/^data:image\/png;base64,/, "");
  const uploadDir = path.join(__dirname,'../',config.uploaddir);
  const filename = `${uuid.v4()}.png`;
  const filepath = `${uploadDir}/${filename}`;
  let result = {};
  fs.writeFile(filepath, base64Data, 'base64', (err)=> {
      result[`name`] = actiondata.name;
      result[`phone`] = actiondata.phone;
      result[`avatar`] = `${config.uploadurl}/${filename}`;
      callbackfn(err,result);
  });
};

module.exports= getbase64file;
