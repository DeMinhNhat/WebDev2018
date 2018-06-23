var db = require('./database');
var config = require('../config/config');

// cart => [
// 	{
// 		product: {},
// 		quantity: 2,
//		amount: 999
// 	},
// ]

exports.getNumberOfItems = cart => {
	if (!cart) {
		return -1;
	}

	var n = 0;
	for (var i = cart.length - 1; i >= 0; i--) {
		n += cart[i].quantity;
	}
	return n;
}

exports.add = (cart, item) => {
	for (var i = cart.length - 1; i >= 0; i--) {
		if (cart[i].product.ProID === item.product.ProID) {
			cart[i].quantity += item.quantity;
			cart[i].amount += item.amount;
			return;
		}
	}
	cart.push(item);
}

exports.remove = (cart, proId) => {
	for (var i = cart.length - 1; i >= 0; i--) {
		if (proId === cart[i].product.ProID) {
			cart.splice(i, 1);
			return;
		}
	}
}