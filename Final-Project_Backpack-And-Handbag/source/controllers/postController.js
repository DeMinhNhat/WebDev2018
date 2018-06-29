var express = require('express'),
	sha256 = require('crypto-js/sha256'),
	moment = require('moment');

var config = require('../config/config');
var cartRepo = require('../repos/cartRepo');
var orderRepo = require('../repos/orderRepo');
var accountRepo = require('../repos/accountRepo');
var productRepo = require('../repos/productRepo');
var productDetailRepo = require('../repos/productDetailRepo');

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
		case 'removeFromCart':
			removeFromCart(req, res);
			break;
		case 'getAmount':
			getAmount(req, res);
			break;
		case 'payment':
			payment(req, res);
			break;
		case 'checkTrade':
			checkTrade(req, res);
			break;
		case 'deleteTrade':
			deleteTrade(req, res);
			break;
		default:
			req.session.isWrong = true;
			res.redirect('back');
			req.session.isWrong = false;
	}
});

module.exports = router;

var login = (req, res) => {

	if (req.session.isLogged === true) {
		req.session.isWrong = true;
		res.redirect('back');
		req.session.isWrong = false;
		return;
	}

	var user = {
		email: req.body.email,
		password: sha256(req.body.pswd).toString()
	};

	// res.redirect(req.headers.referer);
	// res.status(0).redirect('back');
	// var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

	accountRepo.login(user).then(rows => {
		if (rows.length > 0) {
			req.session.isLogged = true;
			req.session.curUser = rows[0];
			if (req.session.prevUser === null || req.session.curUser.f_ID !== req.session.prevUser.f_ID) {
				req.session.cart = [];
			}
			req.session.prevUser = rows[0];

			res.redirect('back');
		} else {
			req.session.isWrong = true;
			res.redirect('back');
			req.session.isWrong = false;
		}
	});
}

var logout = (req, res) => {

	if (req.session.isLogged === false) {
		req.session.isWrong = true;
		res.redirect('back');
		req.session.isWrong = false;
		return;
	}

	req.session.isLogged = false;
	req.session.curUser = null;

	var url = req.originalUrl;
	if (url.indexOf('cart') > -1 || url.indexOf('order') > -1)
		res.redirect('/');
	else
		res.redirect('back');
}

var signup = (req, res) => {

	if (req.session.isLogged === true) {
		req.session.isWrong = true;
		res.redirect('back');
		req.session.isWrong = false;
		return;
	}

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
				if (req.session.prevUser === null || req.session.curUser.f_ID !== req.session.prevUser.f_ID) {
					req.session.cart = [];
				}
				req.session.prevUser = rows[0];

				res.redirect('back');
			} else {
				req.session.isWrong = true;
				res.redirect('back');
				req.session.isWrong = false;
			}
		});
	}).catch(err => {
		req.session.isWrong = true;
		res.redirect('back');
		req.session.isWrong = false;
	});
}

var changeInfo = (req, res) => {

	if (req.session.isLogged === false) {
		req.session.isWrong = true;
		res.redirect('back');
		req.session.isWrong = false;
		return;
	}

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
				if (req.session.prevUser === null || req.session.curUser.f_ID !== req.session.prevUser.f_ID) {
					req.session.cart = [];
				}
				req.session.prevUser = rows[0];

				res.redirect('back');
			} else {
				req.session.isWrong = true;
				res.redirect('back');
				req.session.isWrong = false;
			}
		});
	}).catch(err => {
		req.session.isWrong = true;
		res.redirect('back');
		req.session.isWrong = false;
	});
}

var addToCart = (req, res) => {

	if (req.session.isLogged === false) {
		req.session.isWrong = true;
		res.redirect('back');
		req.session.isWrong = false;
		return;
	}

	productRepo.single(req.body.proId).then(rows => {
		if (rows[0].Quantity < +req.body.quantity) {
			req.session.isWrong = true;
			res.redirect('back');
			req.session.isWrong = false;
			return;
		} else {
			var item = {
				product: rows[0],
				quantity: +req.body.quantity,
				amount: rows[0].Price * +req.body.quantity
			};
			cartRepo.add(req.session.cart, item);
			res.redirect('back');
		}
	});
}

var removeFromCart = (req, res) => {

	if (req.session.isLogged === false) {
		req.session.isWrong = true;
		res.redirect('back');
		req.session.isWrong = false;
		return;
	}

	cartRepo.remove(req.session.cart, +req.body.proId);
	res.redirect('back');
}

var getAmount = (req, res) => {
	cartRepo.getAmount(req.session.cart, +req.body.proId, +req.body.quantity);
	res.redirect('back');
}

// đặt hàng

// orders : {
// 		OrderID: 2
// 		UserID: 5
// 		OrderDate: 02/27/2017
// 		Total: 12
//		State: 1	// đã giao
// }

// orderdetails => [
// 		{
// 			ID: 23	// cái này k quan trọng lắm
// 			OrderID: 2	// ID của cái trên
// 			ProID: 5	// ID của sản phẩm
// 			Quantity: 3	// số lượng sản phẩm đặt
// 			Amount: $60	// tổng tiền cho số lần đặt sản phẩm này
// 		},
// 		...
// ]

var payment = (req, res) => {

	if (req.session.isLogged === false) {
		req.session.isWrong = true;
		res.redirect('back');
		req.session.isWrong = false;
		return;
	}

	if (req.session.cart.length < 1) {
		req.session.isWrong = true;
		res.redirect('back');
		req.session.isWrong = false;
		return;
	}

	// get order info from req
	var orderDate = moment(req.body.orderDate).format('YYYY-MM-DDTHH:mm');

	var order = {
		orderDate: orderDate,
		userID: req.session.curUser.f_ID,
		total: cartRepo.getTotal(req.session.cart), // tổng số tiền
		state: 0
	};

	// add the order
	orderRepo.add(order).then(value => {

		var orderID = value.insertId;

		console.log(orderID);

		var arr_ods = [];

		for (var i = 0; i < req.session.cart.length; i++) {
			var cartItem = req.session.cart[i];

			var od = [+orderID, +cartItem.product.ProID, +cartItem.quantity, +cartItem.amount];
			arr_ods.push(od);
		}

		cartRepo.addMultiCartItemToDB(arr_ods).then(value => {
			req.session.cart = [];
			res.redirect('/order');

		}).catch(err => {
			req.session.isWrong = true;
			res.redirect('back');
			req.session.isWrong = false;
		});

	}).catch(err => {
		req.session.isWrong = true;
		res.redirect('back');
		req.session.isWrong = false;
	});
};

// check đã giao hàng (state của order) => thay đổi quantity của các products đã giao

// Admin Login and Logout
/*var adminLogin = (req, res) => {
	var user = {
		username: req.body.username,
		password: sha256(req.body.pswd).toString(),
		permission: +req.body.permission
	};
	accountRepo.adminlogin(user).then(rows => {
		if (rows.length > 0) {
			req.session.curUser = rows[0];
			req.session.adminLogged = true;
			// res.redirect(req.headers.referer);
			// res.status(0).redirect('back');
			// var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
			res.redirect('/admin');
		} else {
			res.redirect(`/admin/login?errormsg=Login failed`);
		}
	});
}

var adminLogout = (req, res) => {
	console.log('adjfpiaj');
	req.session.adminLogged = false;
	req.session.curUser = null;

	res.redirect('/admin');
}*/

var checkTrade = (req, res) => {

	// need permission of admin
	if (req.session.isLogged === false || req.session.curUser.f_Permission === false) {
		req.session.isWrong = true;
		res.redirect('back');
		req.session.isWrong = false;
		return;
	}

	var orderID = req.body.orderId;

	productDetailRepo.getAllByOrderID(orderID).then(rows => {

		var arr_pros = [];

		for (var i = 0; i < rows.length; i++) {
			var pros = {
				proID: +rows[i].ProID,
				quantity: +rows[i].Quantity
			}

			arr_pros.push(pros);
		}

		productRepo.UpdateMultiQuantities(arr_pros).then(value => {
			// update state = 1
			orderRepo.updateState(orderID, 1).then(value => {
				res.redirect(req.headers.referer);
			});
		}).catch(err => {
			req.session.isWrong = true;
			res.redirect('back');
			req.session.isWrong = false;;
		});
	});

	orderRepo.single(orderID).then(rows => {
		if (rows[0].State === 1) {
			req.session.isWrong = true;
			res.redirect('back');
			req.session.isWrong = false;
			return;
		} else {
			productDetailRepo.getAllByOrderID(orderID).then(rows => {

				var arr_pros = [];

				for (var i = 0; i < rows.length; i++) {
					var pros = {
						proID: +rows[i].ProID,
						quantity: +rows[i].Quantity
					}

					arr_pros.push(pros);
				}

				productRepo.UpdateMultiQuantities(arr_pros).then(value => {
					// update state = 1
					orderRepo.updateState(orderID, 1).then(value => {
						res.redirect('back');
					});
				}).catch(err => {
					req.session.isWrong = true;
					res.redirect('back');
					req.session.isWrong = false;
				});
			});
		}
	});
}

var deleteTrade = (req, res) => {
	if (req.session.isLogged === false) {
		req.session.isWrong = true;
		res.redirect('back');
		req.session.isWrong = false;
		return;
	}

	var orderID = req.body.orderId;

	orderRepo.delete(orderID).then(value => {
		res.redirect('back');
	}).catch(err => {
		req.session.isWrong = true;
		res.redirect('back');
		req.session.isWrong = false;
	});
}