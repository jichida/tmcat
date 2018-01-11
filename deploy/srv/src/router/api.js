
const downloadexcel = require('../handler/downloadexcel');
const insertuser = require('../handler/insertuser');
const testwebbot = require('../handler/testwebbot');
const startapi = (app)=>{
  app.post('/api/insertuser',insertuser);
  app.get('/api/downloadexcel',downloadexcel);
  app.get('/testwebbot',testwebbot);
  //for nginx
  // app.post('/insertuser',insertuser);
  // app.get('/downloadexcel',downloadexcel);

};


module.exports= startapi;
