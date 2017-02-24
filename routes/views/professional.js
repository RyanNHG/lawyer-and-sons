var keystone = require('keystone'),
    Lawyer = keystone.list('Lawyer')

module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals,
        lawyerSlug = req.params.lawyerSlug

    getProfessional(lawyerSlug).then( (professional) => {

        if (professional === undefined) {

            res.redirect('/not-found')

        } else {

            locals.professional = professional

            view.render('professional/index')

        }

    }).catch( function(reason) {

        console.error(reason)

        res.redirect('/not-found')

    })

}

function getProfessional (slug) {

    return Lawyer.model
        .find( { slug: slug })
        .limit(1)
        .populate('office title industries practices')
        .exec()
        .then( function (lawyers) {

            if (lawyers.length === 0) {

                console.error(`Lawyer '${slug}' not found.`)

                return undefined

            } else {

                return lawyers[0]

            }

        })

}
