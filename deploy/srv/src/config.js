
const config =  {
  listenport:process.env.listenport||3005,
  rooturl:process.env.rooturl || 'http://localhost:3005',
  issmsdebug:process.env.issmsdebug || false,

  publishdiradmin:'../../dist/admin',
  uploaddir:'../../dist/uploader',
  uploadurl:'/uploader',
  logdir:'../../dist/log',

  publicdir:'../../dist/public',
  publicurl:'/public',
    // ...
  mongodburl:process.env.MONGO_URL || `mongodb://localhost/tmcat`,

};


module.exports = config;
