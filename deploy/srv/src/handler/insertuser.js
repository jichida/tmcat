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
            });
            //发送结果页面
            // {
            //   phone: '15961125167',
            //   name: '123',
            //   avatar: '/uploader/upload_f2062e28ef196df22ec83dc067ae573f.png',
            //   title: '艺术总监CAO',
            //   desc: '有个性的你在人群中总是闪闪发亮，脑洞大开富有想象力，人格魅力不可阻挡，未来的SuperStar就是你。'
            // }
            // res.render('info',result);


          }
          else{
            //send error
          }
        });
      }
      else{
        //send error
      }
    });
};


module.exports= insertuser;
