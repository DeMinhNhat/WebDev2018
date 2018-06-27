var db = require('./database');
var config = require('../config/config');
var format = require('pg-format');

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

/*exports.decreaseOne = (cart, proId) => {
	for (var i = cart.length - 1; i >= 0; i--) {
		if (proId === cart[i].product.ProID) {
			if (cart[i].quantity === 1)
				cart.splice(i, 1);
			else {
				cart[i].quantity -= 1;
				cart[i].amount -= cart[i].product.Price;
			}
			return;
		}
	}
}

exports.increaseOne = (cart, proId) => {
	for (var i = cart.length - 1; i >= 0; i--) {
		if (proId === cart[i].product.ProID) {
			cart[i].quantity += 1;
			cart[i].amount += cart[i].product.Price;
			return;
		}
	}
}*/

exports.getTotal = (items) => {
	var total = 0;
	for (var i = items.length - 1; i >= 0; i--) {
		total += items[i].amount;
	}
	return total;
}

exports.getAmount = (cart, proId, quantity) => {
	for (var i = cart.length - 1; i >= 0; i--) {
		if (proId === cart[i].product.ProID) {
			if (quantity > cart[i].quantity) {
				cart[i].quantity++;
				cart[i].amount += cart[i].product.Price;
				return;
			} else {
				if (cart[i].quantity === 1)
					cart.splice(i, 1);
				else {
					cart[i].quantity--;
					cart[i].amount -= cart[i].product.Price;
				}
				return;
			}
		}
	}
}

// cartItem => [
// 	{
// 		productID: 4,
// 		quantity: 2,
//		amount: 99
// 	},
// ]

exports.addSingleCartItemToDB = (cartItem, orderId) => {
	var sql = `insert into orderdetails(OrderID, ProID, Quantity, Amount)
	values('${orderId}', '${cartItem.product.ProId}',
	'${cartItem.quantity}', '${cartItem.amount}')`;
	return db.save(sql);
}

exports.addMultiCartItemToDB = (ods) => {
	var sql = format(`insert into orderdetails(OrderID, ProID, Quantity, Amount)
	values %L`, ods);
	console.log(sql);
	return db.save(sql);
}