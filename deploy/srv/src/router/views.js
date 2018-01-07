
const startviews = (app)=>{
  app.get('/', (req, res)=> { res.render('index', {}); });
  app.get('/api', (req, res)=> { res.render('index', { title: 'Express' }); });
  	app.get('/info', (req, res)=> { 
  		var result = {
  			phone: '15961125167',
            name: '123',
            avatar: '/uploader/upload_f2062e28ef196df22ec83dc067ae573f.png',
            title: '艺术总监CAO',
            desc: '有个性的你在人群中总是闪闪发亮，脑洞大开富有想象力，人格魅力不可阻挡，未来的SuperStar就是你。'
        }
  		res.render('info', result); 
	});
  app.get('/error', (req, res)=> { res.render('error', { title: 'Express' }); });
};

module.exports= startviews;
