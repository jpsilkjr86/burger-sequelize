// imports mysql npm and establishes connection
const mysql = require('mysql');
var connection;

if (process.env.JAWSDB_URL) {
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
	// imports keys for password validation
	const keys = require('./keys.js');
	connection = mysql.createConnection({
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: keys.pw,
		database: 'burger_db'
	});
}

module.exports = connection;