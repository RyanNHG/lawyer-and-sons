var keystone = require('keystone')


// Load development environment variables
if (process.env.NODE_ENV !== 'production') {

	try {
		console.info('Loading .env file...')
		require('dotenv').load()
	} catch (ignore) {
		console.warn('Missing .env file')
	}

}


// Configure KeystoneJS app
keystone.init({

	// Project Options (http://keystonejs.com/docs/configuration/#options-project)
	'name': 'Lawyer & Sons',
	'brand': 'Lawyer & Sons',
	'favicon': 'public/img/logo.png',

	// Web Server Options (http://keystonejs.com/docs/configuration/#options-server)
	'env': process.env.NODE_ENV || 'development',
	'port': process.env.PORT || 3000,
	'sass': 'public',
	'static': ['public'],
	'view engine': 'pug',
	'views': './views',

	// Database and User Auth Options (http://keystonejs.com/docs/configuration/#options-database)
	'mongo': process.env.MONGO_URI || 'mongodb://mongo/keystonejs',
	'auth': true,
	'user model': 'User',
	'cookie secret': process.env.COOKIE_SECRET || 'cookie-secret',
	'session': true,

	// Application Updates (http://keystonejs.com/docs/configuration/#updates)
	'auto update': true,

	// Cloudinary Configuration (http://keystonejs.com/docs/configuration/#services-cloudinary)
	'cloudinary config': process.env.CLOUDINARY_URL || 'cloudinary://api_key:api_secret@cloud_name',
	'cloudinary prefix': 'lawyer-and-sons',
	'cloudinary folders': true

})

// Cloudinary
if(process.env.CLOUDINARY_URL === undefined) {

	console.warn(`\nNo CLOUDINARY_URL provided (Can't upload images)\n`);

}

// Import Keystone Models
keystone.import('models')

// Route Configuration
keystone.set('routes', require('./routes/index.js'))

// Navigation Configuration (http://keystonejs.com/docs/configuration/#options-project)
keystone.set('nav', {

	pages: [
		'HomePage',
		'SearchPage',
		// 'PeoplePage',
		// 'ArticlePage',
		// 'CareersPage',
		// 'LocationsPage'
	],
	components: [
		'Navbar',
		'Footer',
		'Section'
	],
	professionals: [
		'Lawyer',
		'LawyerTitle'
		// 'Staff'
	],
	services: [
		'Industry',
		'Practice',
		'PracticeArea'
	],
	articles: [
		// 'Event',
		'Publication',
		// 'News'
	],
	locations: [
		'Office'
	],
	other: [
		'User',
		'Link',
		'BrandColor',
		'List'
	]

})


// Start Keystone
keystone.start()
