var keystone = require('keystone'),
    Types = keystone.Field.Types

var Section = new keystone.List('Section', {
    autokey: { path: 'slug', from: 'name', unique: true },
    defaultSort: '-name'
})

Section.add({

    name: {
        type: Types.Text,
        required: true,
        initial: true,
        unique: true
    },

    header: {
        type: Types.Text
    },

    body: {
        type: Types.Html,
        wysiwyg: true
    },

    callToAction: {
        type: Types.Relationship,
        ref: 'Link'
    },

    image: {
        type: Types.CloudinaryImage
    },

    backgroundColor: {
        type: Types.Relationship,
        ref: 'BrandColor'
    },

    backgroundImage: {
        type: Types.CloudinaryImage
    },

    isLeftAligned: {
        type: Types.Boolean,
        default: true
    }

})

// Shows pages that this section is included in
Section.relationship({ path: 'homePages', ref: 'HomePage', refPath: 'sections' })

Section.register()
