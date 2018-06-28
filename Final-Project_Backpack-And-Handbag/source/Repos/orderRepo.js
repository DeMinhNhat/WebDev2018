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

exports.loadAllByUserID = userID => {
	var sql = `select orders.*, users.*
	from orders inner join users on orders.UserID = users.f_ID 
	where userID = '${userID}'`;
	return db.load(sql);
}

exports.add = order => {
	var sql = `insert into orders(OrderDate, UserID, Total, State)
	values('${order.orderDate}', '${order.userID}', '${order.total}', '${order.state}')`;
	return db.save(sql);
}

exports.updateState = (orderID, state) => {
	var sql = `update orders set State = '${state}'
	where OrderID = '${orderID}'`;
	return db.save(sql);

}

exports.single = orderID => {
	var sql = `select * from orders where OrderID = '${orderID}'`;
	return db.load(sql);
}

exports.delete = orderID => {
	var sql = `delete from orders where OrderID = ${orderID} and State = 0`;
	return db.save(sql);
}