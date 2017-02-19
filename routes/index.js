var keystone = require('keystone'),
	middleware = require('./middleware'),
	importRoutes = keystone.importer(__dirname)

// Common Middleware
keystone.pre('routes', middleware.initLocals)

// Handle 404 errors
keystone.set('404', function(req, res, next) {
	res.err('Page not found.')
})

// Handle other errors
keystone.set('500', function(err, req, res, next) {

	var title, message

	if (err instanceof Error) {
		message = err.message
		err = err.stack
	}

	res.err(err, title, message)

})

// Load Routes
var routes = {
	views: importRoutes('./views')
}

// Bind Routes
module.exports = require('../routes.js')(routes)
