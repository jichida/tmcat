const winston = require('winston');
const moment = require('moment');
const path = require('path');
const config = require('../config.js');
const mkdirp = require('mkdirp');
let logger;
exports.initLog =  ()=>{
  const filename = "app_"+moment().format('YYYY-MM-DD-HHmmss');
  const logdir = path.resolve(__dirname,'../');
  console.log(`logdir==>${logdir}`);
  mkdirp.sync(logdir);

  const logfile = `${config.logdir}/${filename}.log`;
  const logpath = path.resolve(__dirname,'../', logfile);

  const logfileerr = `${config.logdir}/${filename}_err.log`;
  const logpatherr = path.resolve(__dirname,'../', logfileerr);

  const logfilewarn = `${config.logdir}/${filename}_warn.log`;
  const logpathwarn = path.resolve(__dirname,'../', logfilewarn);

  // winston.configure({
  //   transports: [
  //     new (winston.transports.File)({ filename: logpath ,level: 'info'}),
  //     new (winston.transports.File)({  filename: logfileerr, level: 'error'  }),
  //   ]
  // });

    logger = new (winston.Logger)({
      transports: [
        new (winston.transports.File)({
          name: 'info-file',
          filename: logpath ,
          level: 'info'
        }),
        new (winston.transports.File)({
          name: 'error-file',
          filename: logpatherr,
          level: 'error'
        }),
        new (winston.transports.File)({
          name: 'warn-file',
          filename: logpathwarn,
          level: 'warn'
        }),
      ]
  });
};

exports.getlog = ()=>{
   return logger;
}
