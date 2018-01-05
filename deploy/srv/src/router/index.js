let startrouter = (app)=>{
  require('./upload.js')(app);
  // require('./useradmin.js')(app);
};


exports.startrouter = startrouter;
