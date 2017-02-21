var keystone = require('keystone'),
    Types = keystone.Field.Types

var PracticeArea = new keystone.List('PracticeArea', {
    autokey: { path: 'slug', from: 'name', unique: true },
    defaultSort: 'name'
})

PracticeArea.add({

    name: {
        type: Types.Text,
        required: true,
        unique: true,
        initial: true
    },

    practice: {
        type: Types.Relationship,
        ref: 'Practice'
    }

})

PracticeArea.relationship({ path: 'practices', ref: 'Practice', refPath: 'practiceArea' })

PracticeArea.register()
