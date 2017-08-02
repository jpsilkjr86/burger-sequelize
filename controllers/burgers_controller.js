const burger = require('../models/burger.js');

module.exports = (app) => {
	// route for rendering html to index via handlebars engine
	app.get('/', (req, res) => {
		burger.all().then(results => {
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
	// route for grabbing all burger data
	app.get('/burgers/all', (req, res) => {
		burger.all().then(results => {
			res.json(results);
		}).catch(err => {
			res.send(err);
			console.log(err);
		});
	});
	// route for posting new burger data
	app.post('/burgers/new', (req, res) => {
		burger.addNew(req.body.burger_name).then(result => {
			res.send(result);
		}).catch(err => {
			res.send(err);
			console.log(err);
		});
	});
	// route for eating
	app.post('/burgers/eat', (req, res) => {
		burger.eat(req.body.burger_name).then(result => {
			res.send(result);
		}).catch(err => {
			res.send(err);
			console.log(err);
		});
	});
	// route for ordering more
	app.post('/burgers/ordermore', (req, res) => {
		burger.orderMore(req.body.burger_name).then(result => {
			res.send(result);
		}).catch(err => {
			res.send(err);
			console.log(err);
		});
	});
};