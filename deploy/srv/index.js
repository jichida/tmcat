const srvhttp = require('./src/srvhttp.js');
const config = require('./src/config');
const mongoose     = require('mongoose');
const dbinit = require('./src/db/dbinit');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl,{
    socketOptions: {
      // This option is on by default, but why not set it explicitly
      autoReconnect: true
    },
    // This options is 1 second by default, its possible the ha
    // takes longer than 30 seconds to recover.
    reconnectInterval: 5000,
    // This options is 30 by default, why not make it 60
    reconnectTries: Number.MAX_VALUE
  })

// console.log(`rooturl:${config.rooturl}`);
// console.log(`issmsdebug:${config.issmsdebug}`);
dbinit();
srvhttp.startsrv();
