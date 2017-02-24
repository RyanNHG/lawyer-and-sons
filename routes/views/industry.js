var keystone = require('keystone'),
    Industry = keystone.list('Industry')

module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals,
        industrySlug = req.params.industrySlug

    getIndustry(industrySlug).then( (industry) => {

        if (industry === undefined) {

            res.redirect('/services')

        } else {

            locals.industry = industry

            view.render('industry/index')

        }

    }).catch( function(reason) {

        console.error(reason)

        res.redirect('/not-found')

    })

}

function getIndustry (slug) {

    return Industry.model
        .find( { slug: slug })
        .limit(1)
        .populate('professionals industries')
        .exec()
        .then( function (industries) {

            if (industries.length === 0) {

                console.error(`Industry '${slug}' not found.`)

                return undefined

            } else {

                return industries[0]

            }

        })

}
