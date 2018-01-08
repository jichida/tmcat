// This example loads a web page with a GoJS diagram,
// then creates a screenshot of the Diagram with makeImageData, plus a screenshot of the page.

const puppeteer = require('puppeteer');
// const fs = require('fs');
//
//
// puppeteer.launch().then((browser)=>{
//   browser.newPage().then((page)=>{
//     page.goto('http://tmcat.czjcd.com/info/5a532bf5ca1c890001fb4d43', {
//       waitUntil: 'networkidle2' // ensures images are loaded
//     }).then(()=>{
//       page.screenshot({ path: 'page-screenshot.png' }).then(()=>{
//         browser.close();
//       })
//     })
//   })
// });
console.log(`===>`);

(async () => {

    // const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',

        // debug logging
        '--enable-logging', '--v=1'
    ]});
    console.log('browser1==>');
    const page = await browser.newPage();
    console.log('browser2==>');
    await page.goto('http://tmcat.czjcd.com/info/5a532bf5ca1c890001fb4d43', {waitUntil: 'networkidle2'});
    console.log('browser3==>');
    await page.screenshot({path: '/root/tmcat/deploy/dist/uploader/hn.png'});
    console.log('browser4==>');
    await browser.close();
    console.log('browser5==>');
})()
