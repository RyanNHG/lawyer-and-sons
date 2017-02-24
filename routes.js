exports = module.exports = function(routes) {

	return function(app) {

		// VIEWS
		app.get('/', routes.views['home'])

		// Landing Pages
		app.get('/search', routes.views['search'])
		app.get('/professionals', routes.views['search'])
		app.get('/services', routes.views['search'])
		app.get('/insights', routes.views['search'])

		// Detail Pages
		app.get('/lawyers/:lawyerSlug', routes.views['professional'])

		// API
		app.get('/api/search', routes.api['search'])

	}

}
