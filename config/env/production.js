'use strict';

module.exports = {
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/betterfriends',
	assets: {
		lib: {
            css: [
                'public/lib/ionic/css/ionic.min.css'
            ],
            js: [
                'public/lib/lodash/dist/lodash.min.js',
                'public/lib/ionic/js/ionic.bundle.min.js'
            ]
		},
		css: 'public/dist/application.min.css',
		js: [
            'public/dist/application.min.js'
        ]
	}
};