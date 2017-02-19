var keystone = require('keystone'),
    HomePage = keystone.list('HomePage')

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res)
    var locals = res.locals

    getHomepage().then(function(homePages) {

        if(homePages === undefined || homePages.length === 0) {

            console.info('No homepage found, creating a default homepage.')

            locals.page = new HomePage.model()

        } else {

            locals.page = homePages[0]

        }

        locals.data = JSON.stringify({})

        view.render('home/index')

    })
    .catch(console.error)

}

function getHomepage() {

    return HomePage.model
        .find()
        .limit(1)
        .exec()

}
