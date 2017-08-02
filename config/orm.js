var connection = require('./connection.js');

// declares object to be exported
const orm = {
	// orm.connect() returns a promise
	connect: () => {
		return new Promise( (resolve, reject) => {
			// attempts connection to mysql server.
			connection.connect(err => {
				if (err) {
					return reject('\nUnable to connect to server:\n'
					+ 'Failed to establish connection to MySQL database.');
				}
				console.log('connected as id ' + connection.threadId);
				// returns resolve if connection is successful
				return resolve();
			});
		});
	}, // end of orm.connect
	// returns promise which resolves with table of all items in the database
	selectAll: (table) => {
		return new Promise( (resolve, reject) => {
			const queryStr = 'SELECT * FROM ??';
			// queries mysql server according to query string and values
			connection.query(queryStr, table, (err, results) => {
				if (err) {
					return reject('\nServer connection error.\n');
				}
				// returns resolve if connection is successful
				return resolve(results);
			});
		});
	},
	// returns promise which resolves with insert of new rows into database
	insertOneNoDupe: (table, col, val) => {
		return new Promise( (resolve, reject) => {
			// instantiates locally scoped variables for query. extra ON clause added
			// to ensure duplicates are not allowed.
			const queryStr = 'INSERT INTO ?? (??) VALUES (?)'
					+ ' ON DUPLICATE KEY UPDATE ?? = ??';
			const queryValAry = [table, col, val, col, col];
			// queries mysql server according to query string and values
			connection.query(queryStr, queryValAry, (err, result) => {
				if (err) {
					return reject('\nServer connection error.\n');
				}
				// ensures no duplicate items are added to the database
				if (result.insertId === 0) {
					return reject('\nItem already exists!\n');
				}
				// returns resolve if connection is successful
				return resolve(result);
			});
		});
	},
	// returns promise which resolves with update of row values
	updateOneWhereEquals: (table, col1, val1, col2, val2) => {
		return new Promise( (resolve, reject) => {
			// instantiates locally scoped variables for query. extra ON clause added
			// to ensure duplicates are not allowed.
			const queryStr = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
			const queryValAry = [table, col1, val1, col2, val2];
			// queries mysql server according to query string and values
			connection.query(queryStr, queryValAry, (err, result) => {
				if (err) {
					return reject('\nServer connection error.\n');
				}
				// ensures no duplicate are added to the database
				if (result.affectedRows === 0) {
					return reject('\nUnable to locate designated item in database.\n');
				}
				// returns resolve if connection is successful
				return resolve(result);
			});
		});
	},
	// ends connection to mysql server
	end: () => {
		return new Promise( (resolve, reject) => { 
			connection.end(function(err) {
				if (err) {
					return reject('Error disconnencting: ' + err.stack);
				}
				// returns resolve if connection is successful
				return resolve();
			});
		});
	}
};

module.exports = orm;
