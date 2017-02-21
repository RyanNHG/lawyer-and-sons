var keystone = require('keystone'),
    Types = keystone.Field.Types

var _Professional = new keystone.List('Professional', {
    autokey: { path: 'slug', from: 'name', unique: true },
    defaultSort: 'name',
    hidden: true
})

_Professional.add({

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
    }

})

_Professional.relationship({ path: 'relatedIndustries', ref: 'Industry', refPath: 'professionals' })
_Professional.relationship({ path: 'relatedPractices', ref: 'Practice', refPath: 'professionals' })
_Professional.relationship({ path: 'relatedPublications', ref: 'Publication', refPath: 'authors' })

_Professional.register()

module.exports = _Professional
