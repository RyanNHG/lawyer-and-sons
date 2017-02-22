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

    practiceArea: {
        type: Types.Relationship,
        ref: 'PracticeArea'
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

// TODO: Ask if "Practice Group" would be a better solution (relates all practice in group)
Practice.relationship({ path: 'relatedIndustries', ref: 'Industry', refPath: 'practices' })
Practice.relationship({ path: 'relatedPractices', ref: 'Practice', refPath: 'practices' })
Practice.relationship({ path: 'relatedLawyers', ref: 'Lawyer', refPath: 'practices' })
Practice.relationship({ path: 'relatedPublications', ref: 'Publication', refPath: 'practices' })

Practice.register()
