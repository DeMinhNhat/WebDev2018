var express = require('express'),
	sha256 = require('crypto-js/sha256'),
	moment = require('moment');

var config = require('../config/config');
var cartRepo = require('../repos/cartRepo');
var accountRepo = require('../repos/accountRepo');
var productRepo = require('../repos/productRepo');

var router = express.Router();

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
		case 'changeInfo':
			changeInfo(req, res);
			break;
		case 'addToCart':
			addToCart(req, res);
			break;
		default:
			var vm = {
				showError: true,
				errorMsg: 'Something goes wrong'
			};
			res.redirect(req.headers.referer);
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
			// var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
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

var changeInfo = (req, res) => {
	var birday = moment(req.body.birday).format('YYYY-MM-DDTHH:mm');

	var user = {
		id: req.body.id,
		email: req.body.email,
		username: req.body.username,
		oldpassword: sha256(req.body.oldpswd).toString(),
		password: sha256(req.body.newpswd).toString(),
		dob: birday,
		gender: req.body.gender,
		phone: req.body.phone,
		permisson: 0
	};

	accountRepo.update(user).then(value => {
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

var addToCart = (req, res) => {
	productRepo.single(req.body.proId).then(rows => {
		if (rows[0].Quantity < +req.body.quantity) {
			res.redirect(req.headers.referer);
			return;
		}
		var item = {
			product: rows[0],
			quantity: +req.body.quantity,
			amount: rows[0].Price * +req.body.quantity
		};
		cartRepo.add(req.session.cart, item);
		res.redirect(req.headers.referer);
	});
}