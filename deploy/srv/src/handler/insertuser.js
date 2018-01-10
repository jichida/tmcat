const getbase64file = require('../handler/getbase64file');
const getresult = require('../handler/getresult');

const moment = require('moment');
const DBModels = require('../db/models');

const insertuser = (req,res)=>{

    getbase64file(req,(err,userobj)=>{
      if(!err && !!userobj){
        getresult(userobj,(err,result)=>{
          if(!err && !!result){
            console.log(result);
            result.createtime = moment().format('YYYY-MM-DD HH:mm:ss');

            const dbModel = DBModels.ResultModel;
            const entity = new dbModel(result);
            entity.save((err,result)=>{
              if(!err && !!result){
                res.status(200).json({_id:result._id});
              }
              else{
                res.redirect(`/error`);
              }
            });
          }
          else{
            //send error
            res.redirect(`/error`);
          }
        });
      }
      else{
        //send error
        res.redirect(`/error`);
      }
    });
};


module.exports= insertuser;
