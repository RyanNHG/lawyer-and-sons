var keystone = require('keystone'),
    HomePage = keystone.list('HomePage'),
    Section = keystone.list('Section')

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res)
    var locals = res.locals

    getHomepage().then(function(homePage) {

        locals.page = homePage
        locals.data = JSON.stringify({})

        view.render('home/index')

    })
    .catch(console.error)

}

function getHomepage() {

    return HomePage.model
        .find()
        .limit(1)
        .populate('sections')
        .exec()
        .then(function(homePages) {

            var homePage

            if(homePages === undefined || homePages.length === 0) {

                console.info('No homepage found, creating a default homepage.')

                homePage = new HomePage.model()

            } else {

                homePage = homePages[0]

            }

            return populateSections(homePage)

        })

}

function populateSections(homePage) {

    return Section.model
        .find( { '_id': { '$in': homePage.sections } } )
        .populate('callToAction')
        .exec()
        .then(function(sections) {

            homePage.sections = sections

            return homePage

        })

}
