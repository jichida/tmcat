const uuid = require('uuid');
const path = require('path');
const config = require('../config.js');
const webshot = require('webshot');

const snapimage = (url,callbackfn)=>{
  const uploadDir = path.join(__dirname,'../',config.uploaddir);
  const filename = `result_${uuid.v4()}.jpg`;
  const filepath = `${uploadDir}/${filename}`;
  const returi = `${config.uploadurl}/${filename}`;
  console.log(`webshot-->打开${url}\n目标文件:${filepath}\n文件返回地址:${returi}`);

  webshot(url,filepath,{
          windowSize:
          {
            width: 640,
            height: 1460
          },
          streamType:'jpg',
          quality:90
        },
   (err)=> {
      console.log(err);
      callbackfn(err,returi);
    });
};

module.exports= snapimage;
