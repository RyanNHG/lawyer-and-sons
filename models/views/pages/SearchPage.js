var keystone = require('keystone'),
    Types = keystone.Field.Types

var SearchPage = new keystone.List('SearchPage', {
    autokey: { path: 'slug', from: 'name', unique: true }
})

SearchPage.add({

    name: {
        type: Types.Text,
        required: true,
        initial: true,
        unique: true
    },

    url: {
        type: Types.Text,
        required: true,
        initial: true,
        unique: true
    },

    types: {
        type: Types.Relationship,
        ref: 'List',
        many: true
    },

    header: {
        type: Types.Text,
        default: 'Search'
    },

    subheader: {
        type: Types.Text,
        default: 'Let us help.'
    },

    placeholder: {
        type: Types.Text,
        default: 'Search'
    }

})

SearchPage.register()
