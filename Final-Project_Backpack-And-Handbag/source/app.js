var express = require('express');
var exphbs = require('express-handlebars');
var exphbs_section = require('express-handlebars-sections');
var bodyParser = require('body-parser');
var path = require('path');
var wnumb = require('wnumb');

// var handleLayoutMDW = require('./middle-wares/handleLayout');
var handle404MDW = require('./middle-wares/handle404');

var productsController = require('./controllers/productsController');

var app = express();

app.engine('hbs', exphbs({
	defaultLayout: 'dashboard',
	layoutsDir: 'views/layouts/',
	helpers: {
		section: exphbs_section(),
		number_format: n => {
			var nf = wnumb({
				thousand: ','
			});
			return nf.to(n);
		}
	}
}));

app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(express.static(path.resolve(__dirname, 'public')));

//app.use(handleLayoutMDW);

app.get('/', (req, res) => {
	res.redirect('/home');
});

app.use('/management/products', productsController);

app.use(handle404MDW);

app.listen(3000, () => {
	console.log('server running on port 3000');
});