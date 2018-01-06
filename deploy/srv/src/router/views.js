
const startviews = (app)=>{
  app.get('/', (req, res)=> {
    	res.render('index', { title: 'Express' });
  });

  app.get('/api', (req, res)=> {
      res.render('index', { title: 'Express' });
  });
};

module.exports= startviews;
