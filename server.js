// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require("method-override");

// imports for connection purposes
const orm = require('./config/orm.js')

// set up express app
const app = express();
const port = process.env.PORT || 3000;

// set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// serves as default
app.use(express.static("public"));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Imports handlebars and sets it as rendering engine
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// attempts to establish connection to mysql server
orm.connect().then(() => {
	// listens to port after connection to server is established
	app.listen(port, () => {
		console.log('App listening on port ' + port);
		// sets up routes
		require('./controllers/burgers_controller.js')(app);
	});
}).catch(err => {
	console.log(err);
});
	