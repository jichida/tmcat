
const config =  {
  listenport:process.env.listenport||3005,
  rooturl:process.env.rooturl || 'http://api.tczncx.com',
  issmsdebug:process.env.issmsdebug || false,

  publishdiradmin:'../../dist/admin',
  uploaddir:'../../dist/uploader',
  uploadurl:'/uploader',
  logdir:'../../dist/log',
    // ...
  mongodburl:process.env.MONGO_URL || `mongodb://localhost/zhongnandb`,

};


module.exports = config;
