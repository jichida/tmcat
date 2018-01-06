const getuploadfile = require('../handler/uploadfile');

const startapi = (app)=>{
  //获取轨迹回放数据
  app.post('/api/insertuser',(req,res)=>{
    const actiondata = req.body;
    console.log(actiondata);

    getuploadfile(req,(err,result)=>{
      console.log(`getresult===>${JSON.stringify(result)}`);
    });
    // historytrack.queryhistorytrack(actiondata,{},(result)=>{
    //   if(result.cmd === 'queryhistorytrack_result'){
    //     res.status(200).json({list:result.payload.list});
    //   }
    //   else{
    //     res.status(200).json({list:[]});
    //   }
    // });
  });
};


module.exports= startapi;
