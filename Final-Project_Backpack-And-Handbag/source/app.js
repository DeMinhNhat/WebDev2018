var multer = require('multer'); // for upload files
var express = require('express');
var exphbs = require('express-handlebars');
var exphbs_section = require('express-handlebars-sections');
var bodyParser = require('body-parser');
var path = require('path');
var wnumb = require('wnumb');
var dateformat = require('dateformat');
var session = require('express-session');

var handleLayoutMDW = require('./middle-wares/handleLayout');
var handle404MDW = require('./middle-wares/handle404');
var restrict = require('./middle-wares/restrict');

// tui thấy làm vậy ổn, cơ mà tất cả các hàm POST đều nằm chỉ ở 1 file
var postController = require('./controllers/postController');
var productController = require('./controllers/productController');
var homeController = require('./controllers/homeController');
var cartController = require('./controllers/cartController');
var orderController = require('./controllers/orderController');

var app = express();

app.engine('hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: 'views/_layouts/',
	helpers: {
		section: exphbs_section(),
		number_format: n => {
			var nf = wnumb({
				mark: '.',
				thousand: ',',
				prefix: '$',
				// suffix: 'VNĐ'
			});
			return nf.to(n);
		},
		date_format: n => {
			var df = dateformat(n, "dS, mm, yyyy");
			return df;
		},
		date_formatV2: n => {
			var df = dateformat(n, "yyyy-mm-dd");
			return df;
		}
	}
}));
app.set('view engine', 'hbs');

app.use(express.static(
	path.resolve(__dirname, 'public')
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(session({
	secret: 'rac roi that',
	resave: false,
	saveUninitialized: true,
	// cookie: {
	//     secure: true
	// }
}));

app.use(handleLayoutMDW);

app.get('/', (req, res) => {
	res.redirect('/home');
});

app.use('', postController);
app.use('/home', homeController);
app.use('/product', productController);
app.use('/order', restrict, orderController);
app.use('/cart', restrict, cartController);

app.use(handle404MDW);

app.listen(3000, () => {
	console.log('server running on port 3000');
});