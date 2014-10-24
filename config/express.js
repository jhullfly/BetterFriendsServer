'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	compress = require('compression'),
	methodOverride = require('method-override'),
	config = require('./config'),
	consolidate = require('consolidate'),
	path = require('path');

module.exports = function(db) {
	// Initialize express app
	var app = express();

  // Globbing model files
	config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
		require(path.resolve(modelPath));
	});

	// Setting application local variables
	app.locals.title = config.app.title;
	app.locals.description = config.app.description;
	app.locals.keywords = config.app.keywords;
	app.locals.jsFiles = config.getJavaScriptAssets();
	app.locals.cssFiles = config.getCSSAssets();
  app.locals.baseUrl = config.baseUrl;

  // allow cross domain stuff.
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Device-UUID');
    next();
  });
  app.options('*', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Device-UUID');
    res.send();
  });



	// Passing the request url to environment locals
	app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
    res.locals.baseUrl = config.baseUrl;
		next();
	});

	// Should be placed before express.static
	app.use(compress({
		filter: function(req, res) {
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

  // Showing stack errors
	app.set('showStackError', true);

	// Set swig as the template engine
    app.engine('server.view.html', consolidate[config.templateEngine]);

	// Set views path and view engine
	app.set('view engine', 'server.view.html');
	app.set('views', './app/views');

	// Environment dependent middleware
	if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
		// Enable logger (morgan)
		app.use(morgan('dev'));

    //useful for debugging
    app.use(methodOverride('_method', {methods:['POST', 'GET']}));

		// Disable views cache
		app.set('view cache', false);
	} else if (process.env.NODE_ENV === 'production') {
		app.locals.cache = 'memory';
	}

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	// Enable jsonp
	app.enable('jsonp callback');

	app.disable('x-powered-by');

  // disable caching for now.
  //TODO: should do this in a more generic way
  app.get(['/event/*','/user/*','/auth/*','/configuration'], function(req, res, next){
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
  });

	// Setting the app router and static folder
	app.use(express.static(path.resolve('./public')));

  // Little weird to put this here but it has to be before all standard routes.
  var users = require('../app/controllers/users');
  app.route('/auth/*').all(users.authMiddleware);

	// Globbing routing files
	config.getGlobbedFiles('./app/routes/**/*.routes.js').forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});


	app.use(function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) return next();

    var message = '';
    if (err.stack) {
      message = err.stack;
    } else {
      message = JSON.stringify(err);
    }
		// Log it
		console.error(message);

		// Error page
		res.status(500).render('500', {
			error: message
		});
	});

	// Assume 404 since no middleware responded
	app.use(function(req, res) {
		res.status(404).render('404', {
			url: req.originalUrl,
			error: 'Not Found'
		});
	});

	return app;
};