exports = module.exports = function(routes) {

	return function(app) {

		// VIEWS
		app.get('/', routes.views['home'])

		app.get('/search', routes.views['search'])
		app.get('/professionals', routes.views['search'])
		app.get('/services', routes.views['search'])
		app.get('/insights', routes.views['search'])

		// API
		app.get('/api/search', routes.api['search'])

	}

}
