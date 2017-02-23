var keystone = require('keystone'),
    Types = keystone.Field.Types

var Lawyer = new keystone.List('Lawyer', {
    autokey: { path: 'slug', from: 'name', unique: true },
})

Lawyer.add({

    name: {
        type: Types.Name,
        initial: true,
        required: true,
        index: true
    },

    email: {
        type: Types.Email
    },

    phone: {
        type: Types.Text
    },

    fax: {
        type: Types.Text
    },

    bio: {
        type: Types.Html,
        wysiwyg: true
    },

    office: {
        type: Types.Relationship,
        ref: 'Office'
    },

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
