var express = require('express'),
	sha256 = require('crypto-js/sha256'),
	moment = require('moment');

var config = require('../config/config');
var restrict = require('../middle-wares/restrict');
var accountRepo = require('../repos/accountRepo');
var productRepo = require('../repos/productRepo');

var router = express.Router();

router.get('/product/search', (req, res) => {

	var page = req.query.page;
	var s = req.query.search;
	var words = s.split(`[^\W\d](\w|[-']{1,2}(?=\w))*`);

	if (!page) page = 1;
	if (page < 1) page = 1;

	var offset = (page - 1) * config.PRODUCTS_PER_PAGE;

	var p1 = productRepo.loadPageByWords(words, offset);
	var p2 = productRepo.countByWords(words);

	Promise.all([p1, p2]).then(([rows, count_rows]) => {

		var total = count_rows[0].total;
		var nPages = total / config.PRODUCTS_PER_PAGE;
		if (total % config.PRODUCTS_PER_PAGE > 0)
			nPages++;

		var numbers = [];
		for (i = 1; i <= nPages; i++) {
			numbers.push({
				value: i,
				isCurrentPage: i === +page,
				sstring: s
			});
		}

		var vm = {
			products: rows,
			noProducts: rows.length === 0,
			page_numbers: numbers
		};
		res.render('product/search', vm);
	});
});

router.post('*', (req, res) => {

	var typeSubmit = req.body.typeSubmit;

	switch (typeSubmit) {
		case 'signup':
			signup(req, res);
			break;
		case 'login':
			login(req, res);
			break;
		case 'logout':
			logout(req, res);
			break;
		default:
			var vm = {
				showError: true,
				errorMsg: 'Something goes wrong'
			};
			res.redirect(req.headers.referer, vm);
	}
});

module.exports = router;

var login = (req, res) => {
	var user = {
		email: req.body.email,
		password: sha256(req.body.pswd).toString()
	};

	accountRepo.login(user).then(rows => {
		if (rows.length > 0) {
			req.session.isLogged = true;
			req.session.curUser = rows[0];
			req.session.cart = [];

			res.redirect(req.headers.referer);
		} else {
			var vm = {
				showError: true,
				errorMsg: 'Login failed'
			};
			res.redirect(req.headers.referer);
		}
	});
}

var logout = (req, res) => {
	req.session.isLogged = false;
	req.session.curUser = null;
	req.session.cart = [];

	res.redirect(req.headers.referer);
}

var signup = (req, res) => {
	var birday = moment(req.body.birday).format('YYYY-MM-DDTHH:mm');

	var user = {
		email: req.body.email,
		username: req.body.username,
		password: sha256(req.body.pswd).toString(),
		dob: birday,
		gender: req.body.gender,
		phone: req.body.phone,
		permisson: 0
	};

	accountRepo.add(user).then(value => {
		accountRepo.login(user).then(rows => {
			if (rows.length > 0) {
				req.session.isLogged = true;
				req.session.curUser = rows[0];
				req.session.cart = [];

				res.redirect(req.headers.referer);
			} else {
				var vm = {
					showError: true,
					errorMsg: 'Login failed'
				};
				res.redirect(req.headers.referer);
			}
		});
	});
}