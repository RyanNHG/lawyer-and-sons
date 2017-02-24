var keystone = require('keystone'),
    Practice = keystone.list('Practice')

module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals,
        practiceSlug = req.params.practiceSlug

    getPractice(practiceSlug).then( (practice) => {

        if (practice === undefined) {

            res.redirect('/services')

        } else {

            locals.practice = practice

            view.render('practice/index')

        }

    }).catch( function(reason) {

        console.error(reason)

        res.redirect('/not-found')

    })

}

function getPractice (slug) {

    return Practice.model
        .find( { slug: slug })
        .limit(1)
        .populate('professionals industries')
        .exec()
        .then( function (practices) {

            if (practices.length === 0) {

                console.error(`Practice '${slug}' not found.`)

                return undefined

            } else {

                return practices[0]

            }

        })

}
