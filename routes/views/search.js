var keystone = require('keystone'),
    SearchPage = keystone.list('SearchPage')

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res)
    var locals = res.locals

    getSearchPage(req.originalUrl).then(function(searchPage) {

        if(searchPage === undefined)
            res.redirect('/oops')

        locals.page = searchPage
        locals.data = JSON.stringify({})

        view.render('search/index')

    })
    .catch(console.error)

}

function getSearchPage(originalUrl) {

    return SearchPage.model
        .find({ url: originalUrl })
        .limit(1)
        .populate('types')
        .exec()
        .then(function(searchPages) {

            var searchPage

            if(searchPages === undefined || searchPages.length === 0) {

                return undefined

            } else {

                return searchPages[0]

            }

        })

}
