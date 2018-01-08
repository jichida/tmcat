
const downloadexcel = require('../handler/downloadexcel');
const insertuser = require('../handler/insertuser');

const startapi = (app)=>{
  app.post('/api/insertuser',insertuser);
  app.get('/api/downloadexcel',downloadexcel);
  //for nginx
  // app.post('/insertuser',insertuser);
  // app.get('/downloadexcel',downloadexcel);

};


module.exports= startapi;
