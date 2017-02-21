var keystone = require('keystone'),
    _List = keystone.list('List')

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

        getSearchResults(lists, query).then(function(results) {

            var error = results === undefined,
                status = error ? 500 : 200,
                message = error
                    ? 'Sorry, there was an error'
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

function getSearchResults (lists, query) {

    var badListName

    var Lists = lists.map( list => {

        try {
            return keystone.list(list)
        } catch (ignore) {
            badListName = list
        }

    })

    if(badListName !== undefined)
        return Promise.reject(`${badListName} is not a Keystone list.`)

    return getSearchQueryFields(lists).then(function(keysMapping) {

        var resultPromises = Lists.map( function (List, index) {

            var keys = keysMapping[ lists[index] ] || []

            var orConditions = keys.map(key => {

                var findOption = {}

                findOption[key] = { "$regex": query, "$options": "i" }

                return findOption

            })

            return List.model
                .find({ $or: orConditions })
                .select('name slug')
                .exec()

        })

        return Promise.all(resultPromises)

    })

}

function getSearchQueryFields(lists) {

    return _List.model
        .find( { 'keystoneList': { $in: lists } } )
        .exec()
        .then( function(_lists) {

            var keysMapping = {}

            _lists.map( function (_list) {

                keysMapping[_list.keystoneList] = _list.searchQueryField.split(',')

            })

            return keysMapping

        })
        .catch( function (error) {

            console.error(error)

            return {}

        })

}
