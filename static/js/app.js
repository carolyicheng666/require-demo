/*require(['helper'], function(helper){
	var str = helper.trim('   end   ')
	console.log(str)
})*/
/*// [引用jquery.js的三种方式]
// ---方式1: 使用普通路径(不使用baseUrl)---
require(['js/lib/jquery.js'], function($) {

});

// ---方式2: 使用baseUrl---
requirejs.config ({
    baseUrl: 'js/lib',
});

require(['jquery'], function($) {

});

// ---方式3: 使用paths定义---
requirejs.config ({
    baseUrl: 'js',
    paths: {
        "jquery": "lib/jquery"
    }
});

require(['jquery'], function($) {

});
*/

require(['jquery',
         './app/api',
         'i18n!./nls/messages',
         'jquery-ui'], function($, api, i18n){
	$("#user").after("<button class='btn btn-default'>"+i18n.edit+"</button>")
	
	$('#user').click(function(){
		api.getUser().then(function(user){
			console.log(user)
		})
		
		api.loadUser()
	})

	//$("#dialog").dialog()
})
/*require(['jquery','./app/api','modernizr','bootstrap', 'backbone', 'underscore'], function($, api, modernizr, bootstrap, Backbone, _){
	$('#user').click(function(){
		api.getUser().then(function(user){
			console.log(user)
		})
	})
})*/