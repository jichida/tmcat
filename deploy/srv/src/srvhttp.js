const express = require('express');
const app = express();
const path = require('path');
const winston = require('./log/log.js');
const http = require('http').Server(app);
const bodyParser = require("body-parser");
const config = require('./config');
const routerindex = require("./router/index.js");
const upload = require('jquery-file-upload-middleware');
const uuid = require('uuid');
const _  = require('lodash');
const expressLayouts = require('express-ejs-layouts');
const mkdirp = require('mkdirp');

let startsrv = ()=>{

  app.engine('.html', require('ejs').__express);
  app.set('view engine', 'html');
  app.use(expressLayouts);

  const admindir = path.join(__dirname,config.publishdiradmin);
  mkdirp.sync(admindir);
  console.log("static admin:" + admindir);
  app.use('/admin', express.static(admindir));

  const uploaddir = path.join(__dirname,config.uploaddir);
  mkdirp.sync(uploaddir);
  console.log("static upload:" + uploaddir);
  app.use(config.uploadurl, express.static(uploaddir));


  const publicdir = path.join(__dirname,config.publicdir);
  mkdirp.sync(publicdir);
  console.log("static publicdir:" + publicdir);
  app.use(config.publicurl, express.static(publicdir));


  console.log('uploadurl:' + config.uploadurl);
  console.log('uploaddir:' + uploaddir);

  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(bodyParser.json({limit: '50mb'}));

  app.use((req, res, next)=> {
      console.log('req.url:' + req.url);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
      next();
  });

  upload.configure({
    uploadDir: uploaddir,
    uploadUrl: config.uploadurl,
    accessControl: {
        allowOrigin: '*',
        allowMethods: 'POST'
    },
    imageVersions: {// apt-get install imagemagick
      thumbnail: {
        width: 80,
        height: 80
      }
    }
  });

  upload.on("begin", (fileInfo)=> {
    let ext = 'jpg';
    let sz = _.split(fileInfo.type, '/');
    if(sz.length > 1){
      ext = sz[sz.length - 1];
    }
    fileInfo.name = `${uuid.v4()}.${ext}`;
    console.log(`开始上传文件:${JSON.stringify(fileInfo)}`);
  });

  upload.on('error', function (e, req, res) {
    winston.getlog().error(`上传文件失败${e.message}`);
  });
  app.use('/uploadavatar',upload.fileHandler());


  routerindex.startrouter(app);

  http.listen(config.listenport, ()=>{
    winston.initLog();
    console.log(`服务启动,端口号为${config.listenport}`);
    winston.getlog().info(`服务启动,端口号为${config.listenport}`);
  });

  return http;
};

exports.startsrv = startsrv;
