var keystone = require('keystone'),
    Types = keystone.Field.Types

// TODO: Create a _Service.js because this is literally one field more than Industry.js
var Practice = new keystone.List('Practice', {
    autokey: { path: 'slug', from: 'name', unique: true }
})

Practice.add({

    name: {
        type: Types.Text,
        required: true,
        initial: true
    },

    overview: {
        type: Types.Html,
        wysiwyg: true
    },

    professionals: {
        type: Types.Relationship,
        label: 'Related Lawyers',
        ref: 'Lawyer',
        many: true
    },

    industries: {
        type: Types.Relationship,
        label: 'Related Industries',
        ref: 'Industry',
        many: true
    }

})

Practice.relationship({ path: 'practiceAreas', ref: 'PracticeArea', refPath: 'childPractices' })

Practice.relationship({ path: 'relatedIndustries', ref: 'Industry', refPath: 'practices' })
Practice.relationship({ path: 'relatedLawyers', ref: 'Lawyer', refPath: 'practices' })
Practice.relationship({ path: 'relatedPublications', ref: 'Publication', refPath: 'practices' })

Practice.defaultColumns = 'name practiceAreas'
Practice.register()
