var keystone = require('keystone'),
    Types = keystone.Field.Types

var Navbar = new keystone.List('Navbar', {
    autokey: { path: 'slug', from: 'name', unique: true },
    defaultSort: '-name'
})

Navbar.add({

    name: {
        type: Types.Text,
        required: true,
        initial: true,
        unique: true
    },

    brandLabel: {
        type: Types.Text,
        default: 'Lawyer & Sons'
    },

    brandLogo: {
        type: Types.CloudinaryImage,
    },

    searchPlaceholder: {
        type: Types.Text,
        default: 'How can we help?'
    },

    links: {
        type: Types.Relationship,
        many: true,
        ref: 'Link'
    }

})

Navbar.register()
