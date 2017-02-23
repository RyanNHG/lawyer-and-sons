var data = {

 	Link: require('./links'),
    BrandColor: require('./brand-colors'),
    List: require('./lists'),

    Office: require('./offices'),

    Practice: require('./practices'),
    PracticeArea: require('./practice-areas'),

    Navbar: require('./navbars'),
    Footer: require('./footers'),
    Section: require('./sections'),

    HomePage: require('./home-pages'),
    SearchPage: require('./search-pages'),

    Lawyer: require('./lawyers'),
    LawyerTitle: require('./lawyer-titles'),

    Publication: require('./publications'),

}

exports = module.exports = function(keystone) {

    return function() {

        var mongoose = keystone.mongoose,
            modelNames = Object.keys(data),
            modelDocuments = modelNames.map( name => data[name] ),
            models = modelNames.map( name => mongoose.models[name] ),
            modelsToCreate = models.length,
            printedIntroMessage = false,
            message = []

        models.map( (model, index) => {

            var documents = modelDocuments[index],
                documentsCreated = 0,
                documentsToCreate = documents.length

            if (documentsToCreate > 0) {

                documents.map( (document) => {

                    model.create(document, function(err, createdDocument) {

                        documentsToCreate--

                        if(!(err || createdDocument === undefined)){
                            documentsCreated++
                        }

                        if(documentsToCreate == 0) {

                            if(documentsCreated > 0) {

                                if(printedIntroMessage === false) {

                                    printedIntroMessage = true

                                    message.push(`------------------------------`)
                                    message.push(`Initializing local database...\n`)

                                }

                                message.push(`> ${documentsCreated} ${modelNames[index] + (documentsCreated == 1 ? '' : 's')} created.`)
                            }

                            modelsToCreate--

                            if (modelsToCreate == 0 && printedIntroMessage) {

                                message.push('\nInitialization complete!')
                                message.push(`------------------------------\n`)

                                console.log(message.join('\n'))
                            }

                        }

                    })
                })

            }

        })

    }

}
