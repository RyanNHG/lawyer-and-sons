var keystone = require('keystone'),
    Types = keystone.Field.Types

var PracticeArea = new keystone.List('PracticeArea', {
    autokey: { path: 'slug', from: 'name', unique: true }
})

PracticeArea.add({

    name: {
        type: Types.Text,
        required: true,
        unique: true,
        initial: true
    },

    topLevelPractice: {
        type: Types.Relationship,
        ref: 'Practice'
    },

    childPractices: {
        type: Types.Relationship,
        ref: 'Practice',
        many: true
    }

})

PracticeArea.defaultColumns = 'name topLevelPractice'
PracticeArea.register()
