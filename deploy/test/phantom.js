
const phantom = require('phantom');

phantom.create().then(function(instance){
  instance.createPage().then(function(page){
    page.open('http://tmcat.czjcd.com/infohidden/5a532bf5ca1c890001fb4d43', function(){
      page.render('/root/tmcat/deploy/dist/uploader/tmcat2.jpg');
      instance.exit();
      console.log('====>finish!!');
    });
  })
}).catch((e)=>{
  console.log(e);
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
