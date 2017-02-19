var keystone = require('keystone'),
    Navbar = keystone.list('Navbar'),
    Footer = keystone.list('Footer')

exports.initLocals = function(req, res, next) {

    var locals = res.locals

    getNavbar().then( (navbar) => {
        getFooter().then( (footer) => {

            locals.app = {

                title: 'Lawyer & Sons',
                production: keystone.get('env') === 'production',
                showNavbar: true,
                showFooter: true,

            }

            locals.navbar = navbar
            locals.footer = footer

            next()

        })
    })

}

function getNavbar () {

    return Navbar.model
        .findOne()
        .populate('links')
        .exec( (err, navbar) => {

            if( err || navbar === undefined ) {

                return new Navbar.model()

            } else {

                return navbar

            }

        })

}

function getFooter () {

    return Footer.model
        .findOne()
        .populate('links')
        .exec( (err, footer) => {

            if( err || footer === undefined ) {

                return new Footer.model()

            } else {

                return footer

            }

        })

}
