var searchLogic = require('../../logic/search')

exports = module.exports = function(req, res) {

    var lists = req.query.lists,
        query = req.query.query

    if(lists === undefined) {

        res.status(400).json({
            error: true,
            message: `Please include the 'lists' parameter.`,
            data: []
        })

    } else if (query === undefined) {

        res.status(400).json({
            error: true,
            message: `Please include the 'query' parameter.`,
            data: []
        })

    } else {

        lists = lists.split(',')

        searchLogic.getSearchResults(lists, query).then(function(results) {

            var error = results === undefined,
                status = error ? 500 : 200,
                message = error ? 'Sorry, there was an error'
                    : `${results.length} result${ results.length === 1 ? '' : 's'} found.`

            res.status(status).json({
                error: error,
                message: message,
                data: results
            })

        })
        .catch((reason) => {

            console.error(reason)

            res.status(400).json({
                error: true,
                message: reason,
                data: []
            })

        })

    }

}
