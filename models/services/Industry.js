var keystone = require('keystone'),
    Types = keystone.Field.Types

var Industry = new keystone.List('Industry', {
    autokey: { path: 'slug', from: 'name', unique: true }
})

Industry.add({

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
        ref: 'Professional',
        many: true
    },

    industries: {
        type: Types.Relationship,
        ref: 'Industry',
        many: true
    },

    practices: {
        type: Types.Relationship,
        ref: 'Practice',
        many: true
    }

})

Industry.relationship({ path: 'relatedIndustries', ref: 'Industry', refPath: 'industries' })
Industry.relationship({ path: 'relatedPractices', ref: 'Practice', refPath: 'industries' })
Industry.relationship({ path: 'relatedLawyers', ref: 'Lawyer', refPath: 'industries' })
Industry.relationship({ path: 'relatedPublications', ref: 'Publication', refPath: 'industries' })

Industry.register()
