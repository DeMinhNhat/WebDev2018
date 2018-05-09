var express = require('express');
var exphbs = require('express-handlebars');
var exphbs_section = require('express-handlebars-sections');
var path = require('path');

// for dashboard
var productsRepo = require('./Repos/productsRepo');
//

var app = express();

app.engine('hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: 'views/layouts/',
	helpers: {
		section: exphbs_section(),
	}
}));
app.set('view engine', 'hbs');

app.use(express.static(path.resolve(__dirname, 'Public')));

app.get('/management/products/', (req, res) => {
	productsRepo.loadAll().then(rows => {
		var vm = {
			products: rows,
		};
		res.render('management/products', vm);
	});
});

app.listen(3000, () => {
	console.log('server running on port 3000');
});