var keystone = require('keystone'),
    SearchPage = keystone.list('SearchPage'),
    searchLogic = require('../../logic/search')

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res)
    var locals = res.locals

    getSearchPage(req.path).then(function(searchPage) {

        if(searchPage === undefined)
            res.redirect('/oops')

        var query = req.query.keyword

        var data = {
            lists: searchPage.types.map( type => type.keystoneList )
        }

        if (query == undefined) {

            locals.page = searchPage
            locals.data = JSON.stringify(data)

            view.render('search/index')

        } else {

            performSearch(searchPage, query).then(function(results) {

                data.lastQuery = query
                data.results = results

                locals.page = searchPage
                locals.data = JSON.stringify(data)

                view.render('search/index')

            })

        }

    })
    .catch(console.error)

}

function getSearchPage (path) {

    return SearchPage.model
        .find({ url: path })
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

function performSearch (searchPage, query) {

    var lists = searchPage.types.map( type => type.keystoneList )

    return searchLogic.getSearchResults(lists, query).catch(console.error)

}
