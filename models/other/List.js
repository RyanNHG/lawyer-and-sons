var keystone = require('keystone'),
    Types = keystone.Field.Types

var List = new keystone.List('List', {
    autokey: { path: 'slug', from: 'name', unique: true }
})

List.add({

    name: {
        type: Types.Text,
        required: true,
        initial: true,
    },

    keystoneList: {
        type: Types.Text,
        required: true,
        initial: true,
        unique: true
    },

    searchQueryField: {
        type: Types.Text,
        required: true,
        default: 'name'
    }

})

List.register()
