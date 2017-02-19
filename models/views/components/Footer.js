var keystone = require('keystone'),
    Types = keystone.Field.Types

var Footer = new keystone.List('Footer', {
    autokey: { path: 'slug', from: 'name', unique: true },
    defaultSort: '-name'
})

Footer.add({

    name: {
        type: Types.Text,
        required: true,
        initial: true,
        unique: true
    },

    links: {
        type: Types.Relationship,
        many: true,
        ref: 'Link'
    },

    copyrightText: {
        type: Types.Text,
        required: true,
        default: '2017 Lawyer & Sons ©'
    }

})

Footer.register()
