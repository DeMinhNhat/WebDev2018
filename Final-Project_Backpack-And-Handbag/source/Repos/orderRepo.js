var db = require('./database');
var config = require('../config/config');

// orders => [
// 	{
// 		OrderID: 2
// 		UserID: 5
// 		OrderDate: 02/27/2017
// 		Total: 12
//		State: 1	// đã giao
// 	},
// ]

exports.loadAll = () => {
	var sql = `select orders.*, users.*
	from orders inner join users on orders.UserID = users.f_ID`;
	return db.load(sql);
}

exports.add = order => {
	var sql = `insert into orders(OrderDate, UserID, Total, State)
	values('${order.orderDate}', '${order.userID}', '${order.total}', '${order.state}')`;
	return db.save(sql);
}

exports.updateState = order => {
	var sql = `update orders set State = '${order.state}'
	where OrderID = '${order.orderID}'`;
	return db.save(sql);
}

// do not do this query when not insert orders (add order) before
// *important* if not, everything goes wrong :))
exports.getLastInsertID = () => {
	var sql = `select LAST_INSERT_ID() as orderID`;
	return db.load(sql);
}