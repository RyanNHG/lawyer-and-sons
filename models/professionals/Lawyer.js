var keystone = require('keystone'),
    Types = keystone.Field.Types

var Lawyer = new keystone.List('Lawyer', {
    autokey: { path: 'slug', from: 'name', unique: true },
    hidden: false,
    inherits: require('./_Professional')
})

Lawyer.add({

    title: {
        type: Types.Relationship,
        ref: 'LawyerTitle'
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

Lawyer.relationship({ path: 'relatedIndustries', ref: 'Industry', refPath: 'professionals' })
Lawyer.relationship({ path: 'relatedPractices', ref: 'Practice', refPath: 'professionals' })
Lawyer.relationship({ path: 'relatedPublications', ref: 'Publication', refPath: 'authors' })

Lawyer.register()
