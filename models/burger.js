const orm = require('../config/orm.js');

// object to be exported
const burger = {
	// function for eating the burger and changing database state
	eat: (burger_name) => {
		// returns orm.updateOneWhereEquals(), a then-able promise.
		return orm.updateOneWhereEquals('burgers', 'devoured', true, 'burger_name', burger_name);
	},
	// function for ordering more of the same item (the inverse of 'eat')
	orderMore: (burger_name) => {
		// returns orm.updateOneWhereEquals(), a then-able promise. Inverse of burger.eat()
		return orm.updateOneWhereEquals('burgers', 'devoured', false, 'burger_name', burger_name);
	},
	// function for adding new burgers
	addNew: (burger_name) => {
		// returns orm.insertOneNoDupe(), a then-able promise.
		return orm.insertOneNoDupe('burgers', 'burger_name', burger_name);
	},
	// function for grabbing all burgers and their states from the database
	all: () => {
		// returns orm.selectAll(), a then-able promise.
		return orm.selectAll('burgers');
	}
};

module.exports = burger;