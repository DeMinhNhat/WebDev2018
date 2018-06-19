var express = require('express');
var accountRepo = require('../repos/accountRepo');

var router = express.Router();

router.post('*', (req, res) => {

	var typeSubmit = req.body.typeSubmit;

	if (typeSubmit === 'search')
		res.redirect("http://google.com");
	else
	if (typeSubmit === 'signup')
		res.redirect("https://bitbucket.org/");
	else
		// test thực sự :))
		if (typeSubmit === 'login') {

			var user = {
				email: req.body.email,
				password: req.body.pswd
			};

			accountRepo.login(user).then(rows => {
				if (rows.length > 0) {
					req.session.isLogged = true;
					req.session.curUser = rows[0];
					req.session.cart = [];

					var url = '/';
					if (req.query.retUrl) {
						url = req.query.retUrl;
					}
					res.redirect(url);
				} else {
					var vm = {
						showError: true,
						errorMsg: 'Login failed'
					};
					res.redirect("http://www.passportjs.org/");
				}
			});
		}
	else
	if (typeSubmit === 'cart_btn')
		res.redirect("http://facebook.com");
	else
		// trường hợp k có typeSubmit :(((
		res.redirect("http://pornhub.com");
});

module.exports = router;