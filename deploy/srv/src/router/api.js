const startapi = (app)=>{
  app.get('/', (req, res)=> {
    	res.render('index', { title: 'Express' });
  });
};


module.exports= startapi;
