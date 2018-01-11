
const phantom= require('../handler/snapimage.js');

const testphantom = (req,res)=>{
  phantom(`http://tmcat.czjcd.com/info/5a532bf5ca1c890001fb4d43`,(err,result)=>{
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

module.exports= testphantom;
