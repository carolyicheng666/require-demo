var language = document.cookie.match(/language=([^;]+)/)
var locale = 'zh'
if (language) {
	locale = language[1].split('_')[0]
}

requirejs.config({
	baseUrl: 'static/js',
	//urlArgs: '_='+new Date().getTime(),
	paths: {
		'jquery': './lib/jquery',
		'bootstrap': './lib/bootstrap',
		'modernizr': './lib/modernizr',
		'backbone': './lib/backbone',
		'underscore': './lib/underscore',
		'text': './lib/require/text',
		'jquery-ui': './lib/jquery-ui-1.12.1/jquery-ui',
		'css': './lib/require/css',
		'i18n': './lib/require/i18n'
	},
	shim: {
		'modernizr': {
			exports: 'Modernizr'
		},
		'bootstrap': ['jquery'],
		'jquery-ui': ['css!./lib/jquery-ui-1.12.1/jquery-ui.css', 
					  'css!./lib/jquery-ui-1.12.1/jquery-ui.theme.css']
	},
	/*map: {
		'*': {
			'jquery': './lib/jquery1.12.4'
		},
		'app/api': {
			'jquery': './lib/jquery'
		}
	}*/
	config: {
		text: {
			onXhr: function(xhr, url){
				xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
			}
		},
		i18n: {
			locale: typeof locale !== 'undefined' ? locale : 'zh'
		}
	},
	map: {
		'*': {
			'css': './lib/require/css'
		}
	}
})
