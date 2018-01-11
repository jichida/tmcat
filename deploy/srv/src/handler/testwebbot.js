
const webshot= require('../handler/webshot.js');

const testwebbot = (req,res)=>{
  webshot(`http://tmcat.czjcd.com/infohidden/5a532bf5ca1c890001fb4d43`,(err,result)=>{
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
