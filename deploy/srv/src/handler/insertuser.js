const getuploadfile = require('../handler/uploadfile');
const getresult = require('../handler/getresult');

const insertuser = (req,res)=>{
    const actiondata = req.body;
    console.log(actiondata);

    getuploadfile(req,(err,userobj)=>{
      if(!err && !!userobj){
        getresult(userobj,(err,result)=>{
          if(!err && !!result){
            console.log(result);
            //发送结果页面
            // {
            //   phone: '15961125167',
            //   name: '123',
            //   avatar: '/uploader/upload_f2062e28ef196df22ec83dc067ae573f.png',
            //   title: '艺术总监CAO',
            //   desc: '有个性的你在人群中总是闪闪发亮，脑洞大开富有想象力，人格魅力不可阻挡，未来的SuperStar就是你。'
            // }

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
