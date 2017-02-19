exports = module.exports = function(routes) {

	return function(app) {

		app.get('/', routes.views['home'])
		app.get('/professionals', routes.views['home'])

	}

}
