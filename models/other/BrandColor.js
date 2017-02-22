var keystone = require('keystone'),
    Types = keystone.Field.Types

var BrandColor = new keystone.List('BrandColor', {
    autokey: { path: 'slug', from: 'name', unique: true },
    map: { name: 'label' }
})

BrandColor.add({

    label: {
        type: Types.Text,
        required: true,
        initial: true,
    },

    color: {
        type: Types.Color,
        required: true,
        initial: true
    }

})

BrandColor.defaultColumns = 'label color'

BrandColor.register()
