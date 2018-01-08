const DBModels = require('../db/models');
const mongoose = require('mongoose');

const config = require('../config.js');
const snapimage= require('../handler/webshot.js');

const startviews = (app)=>{
  app.get('/', (req, res)=> { res.render('index'); });

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
    // res.redirect(`/infohidden/${req.params.id}`);
    snapimage(`/infohidden/${req.params.id}`,(err,result)=>{
      if(!err && result){
        res.redirect(result);
      }
      else{
        res.redirect(`/error`);
      }
      console.log(result);
    });

	});
  app.get('/error', (req, res)=> { res.render('error'); });
};

module.exports= startviews;
