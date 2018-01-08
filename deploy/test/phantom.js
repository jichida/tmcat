
const phantom = require('phantom');

const snapimage = (url,callbackfn)=>{
  phantom.create().then(function(instance){
    console.log('get instance!!');
    instance.createPage().then(function(page){
      console.log('get page!!');
       page.property('viewportSize', { width: 640, height: 1460 }).then(function(){
         page.open(url, function(status){
           console.log('get open');
           page.render('/root/tmcat/deploy/dist/uploader/tmcat2.jpg');
           instance.exit();
           console.log('====>finish!!');
         });
       });
    })
  }).catch((e)=>{
    console.log(e);
    callbackfn(e,null);
  });
};

snapimage('http://tmcat.czjcd.com/infohidden/5a532bf5ca1c890001fb4d43',(err,result)=>{
  console.log(result);
});
// (async function() {
//   const instance = await phantom.create();
//   const page = await instance.createPage();
//   await page.on('onResourceRequested', function(requestData) {
//     console.info('Requesting', requestData.url);
//   });
//
//   const status = await page.open('https://stackoverflow.com/');
//   const content = await page.property('content');
//   console.log(content);
//
//   await instance.exit();
// })();
