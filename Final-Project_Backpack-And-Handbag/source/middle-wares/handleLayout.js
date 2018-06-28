var categoryRepo = require('../repos/categoryRepo'),
	brandRepo = require('../repos/brandRepo'),
	cartRepo = require('../repos/cartRepo');

module.exports = (req, res, next) => {

	if (req.session.isLogged === undefined) {
		req.session.isLogged = false;
	}
	
	if (req.session.isWrong === undefined) {
		req.session.isWrong = false;
	}

	var p1 = categoryRepo.loadAll();
	var p2 = brandRepo.loadAll();

	Promise.all([p1, p2]).then(([cates, bras]) => {
		res.locals.layoutVM = {
			categories: cates,
			brands: bras,
			isLogged: req.session.isLogged,
			curUser: req.session.curUser,
			cartSummary: cartRepo.getNumberOfItems(req.session.cart),
			isWrong: req.session.isWrong
		}

		next();
	});
}