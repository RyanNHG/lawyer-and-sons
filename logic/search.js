var keystone = require('keystone'),
    _List = keystone.list('List')

exports = module.exports = {
    getSearchResults: getSearchResults
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

    var paths = Lists.map( list => list.path )

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
                .limit(5)
                .exec()

        })

        return Promise.all(resultPromises)
            .then(flattenSearchResults(lists, paths))
            .then(take(5))

    })

}

function flattenSearchResults (listNames, pathNames) {

    return function(resultsArray) {

        var flattenedResults = []

        resultsArray.map( (results, index) => {

            var typedResults = results.map( function(result) {

                var title = result.name,
                    slug = result.slug,
                    _id = result._id,
                    subtitle = listNames[index],
                    url = '/' + pathNames[index] + '/' + slug

                if (result.name !== undefined && result.name.first !== undefined)
                    title = result.name.first + ' ' + result.name.last

                return { _id, title, subtitle, slug, url };
            })

            flattenedResults = flattenedResults.concat(typedResults)

        })

        return flattenedResults

    }

}

function take (count) {

    return function (array) {
        return array.slice(0, count)
    }

}

function getSearchQueryFields (lists) {

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
