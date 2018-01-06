
const startviews = (app)=>{
  app.get('/', (req, res)=> {
    	res.render('index', { title: 'Express' });
  });
};

module.exports= startviews;
