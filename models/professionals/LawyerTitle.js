var keystone = require('keystone'),
    Types = keystone.Field.Types

var LawyerTitle = new keystone.List('LawyerTitle', {
    autokey: { path: 'slug', from: 'name', unique: true },
    defaultSort: '-name'
})

LawyerTitle.add({

    name: {
        type: Types.Text,
        required: true,
        unique: true,
        initial: true
    }

})

LawyerTitle.relationship({path: 'relatedLawyers', ref: 'Lawyer', refPath: 'title' })

LawyerTitle.register()
