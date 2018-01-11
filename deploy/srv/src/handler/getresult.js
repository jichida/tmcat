const DBModels = require('../db/models');
const _ = require('lodash');
const moment = require('moment');
const getresult = (user,callbackfn)=>{
  const userModel = DBModels.UserModel;
  user.updatetime = moment().format('YYYY-MM-DD HH:mm:ss');
  userModel.findOneAndUpdate({phone:user.phone}, {$set:user},{new: true,upsert:true},(err,usernew)=>{
    if(!err && !!usernew){
      let phoneid = 0;
      try{
        phoneid = parseInt(usernew.phone);
        phoneid = phoneid % 10;
      }
      catch(e){
        console.log(e);
      }
      const gameModel = DBModels.GameDescModel;
      gameModel.findOne({pid:phoneid},(err,gameobj)=>{
        if(!err && !!gameobj){
          // let result = usernew.toJSON();
          // result = _.omit(result,['_id','__v']);
          let gameobjnew = gameobj.toJSON();
          gameobjnew = _.omit(gameobjnew,['_id','pid','__v']);
          let result = _.merge(user,gameobjnew);
          callbackfn(null,result);
        }
        else{
          callbackfn(err,null);
        }
      });
    }
    else{
      callbackfn(err,null);
    }
  });
}

module.exports= getresult;
