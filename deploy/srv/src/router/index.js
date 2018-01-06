const startrouter = (app)=>{
  require('./upload.js')(app);
  require('./views.js')(app);
  require('./api.js')(app);
};


exports.startrouter = startrouter;
