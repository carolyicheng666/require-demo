requirejs.config({
	paths:{
		'jquery':['//cdn.bootcss.com/jquery/3.2.1/jquery','./lib/jquery']
	}
})
define('helper', ['jquery'], function($){
	return {
		trim: function(str){
			return $.trim(str)
		}
	}
})