var keystone = require('keystone'),
    Types = keystone.Field.Types

var Publication = new keystone.List('Publication', {
    autokey: { path: 'slug', from: 'name', unique: true },
    defaultSort: 'name',
    drilldown: 'authors'
})

Publication.add({

    name: {
        type: Types.Text,
        required: true,
        unique: true,
        initial: true
    },

    date: {
        type: Types.Date,
        default: Date.now,
    },

    authors: {
        type: Types.Relationship,
        ref: 'Professional',
        many: true,
        collapsed: true
    },

    body: {
        type: Types.Html,
        wysiwyg: true
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

Publication.register()
