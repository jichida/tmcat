
const webshot= require('../handler/webshot.js');

const testwebbot = (req,res)=>{
  webshot(`http://www.baidu.com`,(err,result)=>{
    console.log(err);
    console.log(result);
    if(!err && result){
      let json = {imageurl:result};
      res.render('image', json);
      // res.redirect(result);
    }
    else{
      res.redirect(`/error`);
    }
  });
};

module.exports= testwebbot;
