const getuploadfile = require('../handler/uploadfile');
const getresult = require('../handler/getresult');

const startapi = (app)=>{
  //获取轨迹回放数据
  app.post('/api/insertuser',(req,res)=>{
    const actiondata = req.body;
    console.log(actiondata);

    getuploadfile(req,(err,userobj)=>{
      if(!err && !!userobj){
        getresult(userobj,(err,result)=>{
          if(!err && !!result){
            console.log(result);
            //发送结果页面
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

  });
};


module.exports= startapi;
