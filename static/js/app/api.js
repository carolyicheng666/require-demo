/*requirejs.config({
	paths:{
		'jquery':'../lib/jquery'
	}
})*/
define(['jquery','text!../../../user.html!strip'], function($, template){
	return {
		getUser: function(){
			var def = $.Deferred()
			require(['./app/user'], function(user){
				def.resolve(user)
			})
			return def
		},
	
		loadUser: function() {
			$("#userinfo").html(template)
		}
	}
})