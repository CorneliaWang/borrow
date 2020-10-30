var mysql = require('mysql')
var express = require('express')


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'borrow_system'
});

connection.connect();

var User = {
    UserLogin: function (userinfo, callback) {
        connection.query('SELECT * from users WHERE name=' + '\'' + userinfo.username + '\'' + 'AND ' + 'password=' + '\'' + userinfo.password + '\'', function (error, results, fields) {
            //console.log(results[0])
            if (!error && results[0]) {
                return callback(null, userinfo);
            } else {
                return callback(error, null);
            }
        })
    }
}

module.exports = User;
