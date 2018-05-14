var express = require('express');
var exphbs = require('express-handlebars');
var exphbs_section = require('express-handlebars-sections');
var bodyParser = require('body-parser');
var path = require('path');

var productsController = require('./controllers/productsController');

var productsRepo = require('./repos/productsRepo');

var app = express();

app.engine('hbs', exphbs({
	defaultLayout: 'dashboard',
	layoutsDir: 'views/layouts/',
	helpers: {
		section: exphbs_section(),
	}
}));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(express.static(path.resolve(__dirname, 'public')));

// app.get('/management/products/', (req, res) => {
// 	productsRepo.load().then(rows => {
// 		var vm = {
// 			products: rows,
// 		};
// 		// res.render('management/products/', {
// 		// 	layout: 'dashboard'
// 		// }, vm);
// 		res.render('management/products', vm);
// 	});
// });

app.use('/management/products', productsController);

app.listen(3000, () => {
	console.log('server running on port 3000');
});