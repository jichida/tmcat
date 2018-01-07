const DBModels = require('../db/models');
const mongoose = require('mongoose');

const startviews = (app)=>{
  app.get('/', (req, res)=> { res.render('index', {}); });
  app.get('/api', (req, res)=> { res.render('index', { title: 'Express' }); });
  app.get('/info/:id', (req, res)=> {
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
  		// var result = {
  		// 	phone: '15961125167',
      //       name: '123',
      //       avatar: '/uploader/upload_f2062e28ef196df22ec83dc067ae573f.png',
      //       title: '艺术总监CAO',
      //       desc: '有个性的你在人群中总是闪闪发亮，脑洞大开富有想象力，人格魅力不可阻挡，未来的SuperStar就是你。'
      //   }

	});
  app.get('/error', (req, res)=> { res.render('error', { title: 'Express' }); });
};

module.exports= startviews;
