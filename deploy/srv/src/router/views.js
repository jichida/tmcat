const DBModels = require('../db/models');
const mongoose = require('mongoose');
const webshot = require('webshot');
const uuid = require('uuid');
const path = require('path');
const config = require('../config.js');


const startviews = (app)=>{
  app.get('/', (req, res)=> { res.render('index', {}); });
  app.get('/api', (req, res)=> { res.render('index', { title: 'Express' }); });
  app.get('/infohidden/:id', (req, res)=> {
      const resultid = mongoose.Types.ObjectId(req.params.id);
      const dbModel = DBModels.ResultModel;
      dbModel.findOne({_id:resultid},(err,result)=>{
        if(!err && !!result){
          res.render('info', result);
        }
        else{
          res.render('error');
        }
      });

	});
  app.get('/info/:id', (req, res)=> {
      const uploadDir = path.join(__dirname,'../',config.uploaddir);
      const filename = `result_${uuid.v4()}.png`;
      const filepath = `${uploadDir}/${filename}`;

      webshot(`${config.rooturl}/infohidden/${req.params.id}`,filepath,
        {
          windowSize:
          {
            width: 640,
            height: 1460
          }
      },(err)=> {
         res.redirect(`${config.uploadurl}/${filename}`);
      });

	});
  app.get('/error', (req, res)=> { res.render('error', { title: 'Express' }); });
};

module.exports= startviews;
