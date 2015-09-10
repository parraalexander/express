var express = require('express');
var handlebars = require('express3-handlebars')
.create({defaultLayout:'main'});
var fortune = require('./lib/fortune.js');

var app = express();
//se declara el directorio estatico
app.use(express.static(__dirname + '/public'));

app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
app.set('port',process.env.PORT||3000);
app.get('/',function(req,res){
	//res.type('text/plain');
	//res.send('Meodowlosrk Travel Home');
	res.render('home');
});
app.get('/about',function(req,res){
	//res.type('text/plain');
	//res.send('About Meodowlosrk Travel Home');
	var randomFortune = fortune.getFortune();
	res.render('about',{fortune:randomFortune});
});
app.use(function(err,req,res,next){
	//res.type('text/plain');
	res.status(404);
	//res.send('404 - not found');
	console.error(err.stack);
	res.render('404');
});
app.use(function(err,req,res,next){
	//res.type('text/plain');
	res.status(500);
	//res.send('500 - Server Error');
	console.error(err.stack);
	res.render('404');
});
app.listen(app.get('port'),function(){
console.log('Server Express running localhost'+app.get('port')+ ' press Ctrl + C to shutdown' );
	
});