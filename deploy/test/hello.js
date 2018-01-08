var page = require('webpage').create();
//viewportSize being the actual size of the headless browser
page.viewportSize = {    width: 640,
    height: 1460 };
//the clipRect is the portion of the page you are taking a screenshot of
page.clipRect = { top: 0, left: 0,     width: 640,
    height: 1460 };
//the rest of the code is the same as the previous example
console.log('hello');
console.log('你好');

page.open('http://tmcat.czjcd.com/infohidden/5a532bf5ca1c890001fb4d43', function() {
  page.render('/root/tmcat/deploy/dist/uploader/tmcat.png');
  phantom.exit();
});
