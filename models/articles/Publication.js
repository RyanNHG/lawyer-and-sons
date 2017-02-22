var keystone = require('keystone'),
    Types = keystone.Field.Types

var Publication = new keystone.List('Publication', {
    autokey: { path: 'slug', from: 'name', unique: true }
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
        label: 'Related Industries',
        ref: 'Industry',
        many: true
    },

    practices: {
        type: Types.Relationship,
        label: 'Related Practices',
        ref: 'Practice',
        many: true
    }

})

Publication.schema.virtual('__t', function(){
    return 'Publication';
})

Publication.register()
