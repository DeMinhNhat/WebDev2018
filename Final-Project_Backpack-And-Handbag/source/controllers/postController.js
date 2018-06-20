var express = require('express'),
	sha256 = require('crypto-js/sha256'),
	moment = require('moment');

var restrict = require('../middle-wares/restrict');
var accountRepo = require('../repos/accountRepo');

var router = express.Router();

router.post('*', (req, res) => {

	var typeSubmit = req.body.typeSubmit;

	switch (typeSubmit) {
		case 'search':
			search(req, res);
			break;
		case 'signup':
			signup(req, res);
			break;
		case 'login':
			login(req, res);
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
		password: req.body.pswd
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