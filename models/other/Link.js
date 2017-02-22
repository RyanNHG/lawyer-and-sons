var keystone = require('keystone'),
    Types = keystone.Field.Types

var Link = new keystone.List('Link', {
    autokey: { path: 'slug', from: 'name', unique: true },
    map: { name: 'label' }
})

Link.add({

    label: {
        type: Types.Text,
        required: true,
        initial: true,
    },

    url: {
        type: Types.Text,
        required: true,
        initial: true,
    },

    icon: {
        type: Types.Text,
        note: 'Select an icon from http://fontawesome.io/icons/ (Example: "fa-circle")'
    }

})

Link.defaultColumns = 'label url icon'

Link.register()
