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
		app.get('/practices/:practiceSlug', routes.views['practice'])
		app.get('/industries/:industrySlug', routes.views['industry'])
		app.get('/publications/:publicationSlug', routes.views['publication'])
		app.get('/offices/:officeSlug', routes.views['home'])

		// Not Found
		app.get('/careers', routes.views['home'])
		app.get('/not-found', routes.views['home'])

		// API
		app.get('/api/search', routes.api['search'])

	}

}
