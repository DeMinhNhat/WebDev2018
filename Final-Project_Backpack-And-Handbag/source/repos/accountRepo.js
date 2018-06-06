var db = require('./database');
var config = require('../config/config');

exports.add = user => {
	var sql = `insert into users(f_Username, f_Password, f_Name, f_Email, f_DOB, f_Permission) 
	values('${user.username}', '${user.password}', '${user.name}', '${user.email}', '${user.dob}', ${user.permisson})`;
	return db.save(sql);
}

exports.update = user => {
	var sql = `update users set f_Username = '${user.username}', 
	f_Password = ${user.password}', f_Name = '${user.name}', 
	f_Email = '${user.email}', f_DOB = '${user.dob}', 
	f_Permission = ${user.permisson} where f_ID = ${user.id}`;
	return db.save(sql);
}

exports.login = user => {
	var sql = `select * from users where f_Username = '${user.username}' 
	and f_Password = '${user.password}'`;
	return db.load(sql);
}