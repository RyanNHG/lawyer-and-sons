var keystone = require('keystone'),
    Types = keystone.Field.Types

var Office = new keystone.List('Office', {
    autokey: { path: 'slug', from: 'name', unique: true },
    defaultSort: '-name'
})

Office.add({

    name: {
        type: Types.Text,
        required: true,
        initial: true,
    },

    description: {
        type: Types.Html,
        wysiwyg: true
    },

    location: {
        type: Types.Location
    }

})

Office.relationship({ path: 'relatedProfessionals', ref: 'Professional', refPath: 'office' })

Office.register()
