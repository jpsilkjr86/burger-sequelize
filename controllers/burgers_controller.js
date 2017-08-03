// imports sequelize db object and its models
const db = require('../models');
// exports as a function which takes in express app paramters
module.exports = (app) => {
	// route for rendering html to index via handlebars engine
	app.get('/', (req, res) => {
		// sequelize method for returning all rows
		db.Burger.findAll({}).then(results => {
			// get ready burgers and eaten burgers array by sifting through data
			let eatenBurgers = [];
			let readyBurgers = [];
			// loop through results and sort burgers according to devoured value
			for (let i = 0; i < results.length; i++) {
				if (results[i].devoured) {
					eatenBurgers.push(results[i]);
				}
				if (!results[i].devoured) {
					readyBurgers.push(results[i]);
				}
			}
			// render according to arrays
			res.render('index', {
				eatenBurgers: eatenBurgers,
				readyBurgers: readyBurgers
			});
		});		
	});
	// route for grabbing all burger data and sending is as json
	app.get('/burgers/all', (req, res) => {
		db.Burger.all().then(results => {
			res.json(results);
		}).catch(err => {
			res.send(err);
			console.log(err);
		});
	});
	// route for posting new burger data
	app.post('/burgers/new', (req, res) => {
		console.log(req.body);
		// sequelize method for inserting new rows
		db.Burger.create({burger_name: req.body.burger_name}).then(result => {
			res.send(result);
		}).catch(err => {
			if (err.errors[0].message) {
				console.log(err.errors[0].message);
				res.send(err.errors[0].message);
			}
			else {
				console.log(err);
				res.send(err);
			}
			
		});
	});
	// route for eating
	app.post('/burgers/eat', (req, res) => {
		db.Burger.update({devoured: true}, {
			where: {
				burger_name: req.body.burger_name
			}
		}).then(result => {
			res.send(result);
		}).catch(err => {
			res.send(err);
			console.log(err);
		});
	});
	// route for ordering more
	app.post('/burgers/ordermore', (req, res) => {
		db.Burger.update({devoured: false}, {
			where: {
				burger_name: req.body.burger_name
			}
		}).then(result => {
			res.send(result);
		}).catch(err => {
			res.send(err);
			console.log(err);
		});
	});
};