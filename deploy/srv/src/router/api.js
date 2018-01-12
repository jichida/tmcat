
const downloadexcel = require('../handler/downloadexcel');
const insertuser = require('../handler/insertuser');
const testwebbot = require('../handler/testwebbot');
const testphantom = require('../handler/testphantom');
const startapi = (app)=>{
  app.post('/api/insertuser',insertuser);
  app.post('/api/downloadexcel',downloadexcel);
  app.get('/testwebbot',testwebbot);
  app.get('/testphantom',testphantom);
  //for nginx
  // app.post('/insertuser',insertuser);
  // app.get('/downloadexcel',downloadexcel);

};


module.exports= startapi;
