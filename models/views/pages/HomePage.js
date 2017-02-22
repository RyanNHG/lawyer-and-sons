var keystone = require('keystone'),
    Types = keystone.Field.Types

var HomePage = new keystone.List('HomePage', {
    autokey: { path: 'slug', from: 'name', unique: true }
})

HomePage.add({

    name: {
        type: Types.Text,
        required: true,
        initial: true,
        unique: true
    },

    header: {
        type: Types.Text,
        default: 'Lawyer & Sons'
    },

    subheader: {
        type: Types.Text,
        default: 'Helping you do things.'
    },

    sections: {
        type: Types.Relationship,
        ref: 'Section',
        many: true
    }

})

HomePage.register()
