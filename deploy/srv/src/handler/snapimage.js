const uuid = require('uuid');
const path = require('path');
const config = require('../config.js');
const phantom = require('phantom');

const snapimage = (url,callbackfn)=>{
  const uploadDir = path.join(__dirname,'../',config.uploaddir);
  const filename = `result_${uuid.v4()}.jpg`;
  const filepath = `${uploadDir}/${filename}`;
  const returi = `${config.uploadurl}/${filename}`;
  console.log(`phantom->打开${url}\n目标文件:${filepath}\n文件返回地址:${returi}`)
  phantom.create().then(function(instance){
    instance.createPage().then(function(page){
       page.property('viewportSize', { width: 640, height: 1460 }).then(function(){
         page.open(url).then(function(status){
           page.render(filepath).then(function(){
             instance.exit();
             callbackfn(null,returi);
           });
         });
       });
    })
  }).catch((e)=>{
    callbackfn(e,null);
  });
};

module.exports= snapimage;
