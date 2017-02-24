var keystone = require('keystone'),
    Publication = keystone.list('Publication')

module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals,
        publicationSlug = req.params.publicationSlug

    getPublication(publicationSlug).then( (publication) => {

        if (publication === undefined) {

            res.redirect('/services')

        } else {

            locals.publication = publication
            locals.publication.formattedDate = formatDate(publication.date)

            view.render('publication/index')

        }

    }).catch( function(reason) {

        console.error(reason)

        res.redirect('/not-found')

    })

}

function formatDate (date) {

    var dayOfWeek = getDayOfWeek(date),
        month = getMonthName(date),
        dayOfMonth = date.getDate(),
        year = date.getFullYear()

    return `${dayOfWeek} | ${month} ${dayOfMonth}, ${year}`

}

function getDayOfWeek (date) {

    var daysOfWeek = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ],
        dayIndex = date.getDay()

    if(dayIndex < daysOfWeek.length)
        return daysOfWeek[dayIndex]
    else
        console.error('Invalid day index: ' + dayIndex)

}

function getMonthName (date) {

    var months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        monthIndex = date.getMonth()

    if (monthIndex < months.length)
        return months[monthIndex]
    else {
        console.error('Invalid month index: ' + monthIndex)
    }

}

function getPublication (slug) {

    return Publication.model
        .find( { slug: slug } )
        .limit(1)
        .populate('authors practices industries')
        .exec()
        .then( function (industries) {

            if (industries.length === 0) {

                console.error(`Publication '${slug}' not found.`)

                return undefined

            } else {

                return industries[0]

            }

        })

}
