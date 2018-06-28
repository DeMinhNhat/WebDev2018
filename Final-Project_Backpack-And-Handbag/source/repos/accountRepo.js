var db = require('./database');
var config = require('../config/config');

exports.add = user => {
	var sql = `insert into users(f_Username, f_Password, f_Email, f_DOB, f_Gender, f_Phone, f_Permission)
	values('${user.username}', '${user.password}', '${user.email}', '${user.dob}', '${user.gender}', '${user.phone}', '${user.permisson}')`;
	return db.save(sql);
}

exports.update = user => {
	var sql = `update users set f_Username = '${user.username}', 
	f_Password = '${user.password}', f_Email = '${user.email}',
	f_DOB = '${user.dob}', f_Gender = '${user.gender}', f_Phone = '${user.phone}',
	f_Permission = '${user.permisson}' where f_ID = '${user.id}' and f_Password = '${user.oldpassword}'`;
	return db.save(sql);
}

exports.login = user => {
	var sql = `select * from users where f_Email = '${user.email}' 
	and f_Password = '${user.password}'`;
	return db.load(sql);
}

/*exports.adminlogin = user => {
	var sql = `select * from users where f_Username = '${user.username}' 
	and f_Password = '${user.password}' and f_Permission = ${user.permission}`;
	return db.load(sql);
}*/