
const phantom = require('phantom');

phantom.create().then((instance)=>{
  instance.createPage().then((page)=>{
    page.open('http://tmcat.czjcd.com/infohidden/5a532bf5ca1c890001fb4d43', ()=> {
      page.render('/root/tmcat/deploy/dist/uploader/tmcat.jpg');
      instance.exit();
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
