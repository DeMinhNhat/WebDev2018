var mysql = require('mysql');
var mssql = require('mssql');
var nodesql = require('node-mysql');

exports.load = sql => {
    return new Promise((resolve, reject) => {
        var cn = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '',
            database: 'qlbh'
        });

        cn.connect();

        cn.query(sql, function(error, rows, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(rows);
            }

            cn.end();
        });
    });
}

exports.save = sql => {
    return new Promise((resolve, reject) => {
        var cn = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '',
            database: 'qlbh'
        });

        cn.connect();

        cn.query(sql, function(error, value) {
            if (error) {
                reject(error);
            } else {
                resolve(value);
            }

            cn.end();
        });
    });
}

exports.saveAll = (sql, values) => {
    return new Promise((resolve, reject) => {
        var cn = nodesql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '',
            database: 'qlbh'
        });

        cn.connect();
        console.log('connect');
        cn.query(sql, [values], function(error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
            console.log('running');
            cn.end();
            console.log('end');

        });
    });
}