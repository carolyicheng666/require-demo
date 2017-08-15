# Requirejs学习笔记

    https://github.com/requirejs/requirejs

**为什么要使用`requirejs`** ? 

1.异步加载文件

2.模块化开发，一个文件一个模块，减少全局变量


## 基本使用

`define`: 定义模块

方法一: 函数式定义
``` javascript
define('helper', ['jquery'], function($){
  return {
    trim: function(str){
      return $.trim(str)
	}
  }
})
```

说明: `helper`代表定义的模块名，`jquery`代表模块的依赖，`function`内代表模块的实现，`return`返回结果

方法二: 对象式定义（推荐）
``` javacript
//user.js
define({
  username: 'yi',
  name: 'carol',
  email: '7*******5@qq.com',
  sex: 'male'
})

//api.js
define(['jquery'], function($){
  return {
    getUser: function(){
      var def = $.Deferred()
      require(['./app/user'], function(user){
        def.resolve(user)
      })
      return def
    }
  }
})
```
`require`: 加载模块

``` javascript
require(['helper'], function(helper){
  var str = helper.trim('   end   ')
  console.log(str)
})
```

说明: `helper`代表定义的模块名，`function`内代表模块的实现

`requirejs`是以一个相对于`baseUrl`的地址来加载所有的代码（三种方式：`html`、`data-main`、`baseUrl`）

**加载机制**: `requirejs`使用`head.appendChild()`将每一个依赖加载为一个`script`标签，加载即执行


## 简单配置

**配置`baseUrl`**

`paths`: 映射不放于baseUrl下的模块名
``` javascript
requirejs.config({
  baseUrl: 'static/js',
  paths: {
    'jquery': './lib/jquery'
  }
})
```

**配置不支持AMD的库**
``` javascript
requirejs.config({
  shim: {
    'modernizr': {
	  exports: 'Modernizr'
	},
	'bootstrap': ['jquery'],
	'jquery-ui': ['css!./lib/jquery-ui-1.12.1/jquery-ui.css','css!./lib/jquery-ui-1.12.1/jquery-ui.theme.css']
  }
})
```

`map`、`waitSeconds`、`urlArgs`等配置可查阅相关文档，在此不赘述

## 加载插件

**1. text插件**

        https://github.com/requirejs/text
    
用于加载文本文件的requirejs插件，通过ajax请求来加载文本，有跨域访问的限制

ps: chrome浏览器若出现"Cross origin requests are only supported for protocol schemes: http, data,chrome-extension, https, chrome-extension-resource." 可在浏览器"属性-目标"后添加 --allow-file-access-from-files，注意前面要有一个空格

``` javascript
require(['text!../../../user.html'], function(template){
    $("#userinfo").html(template)
})
```

``` javascript
requirejs.config({
  config: {
    text: {
      onXhr: function (xhr, url) {
        //Called after the XHR has been created and after the
        //xhr.open() call, but before the xhr.send() call.
        //Useful time to set headers.
        //xhr: the xhr object
        //url: the url that is being used with the xhr object.
      },
      createXhr: function () {
        //Overrides the creation of the XHR object. Return an XHR
        //object from this function.
        //Available in text.js 2.0.1 or later.
      },
      onXhrComplete: function (xhr, url) {
        //Called whenever an XHR has completed its work. Useful
        //if browser-specific xhr cleanup needs to be done.
      }
    }
  }
});
```

**2. css插件**

        https://github.com/guybedford/require-css
    
用于加载样式的requirejs插件
    
例如要使用jquery-ui
``` javascript
requirejs.config({
	baseUrl: 'static/js',
	paths: {
		'jquery': './lib/jquery',
		'jquery-ui': './lib/jquery-ui-1.12.1/jquery-ui',
		'css': './lib/require/css'
	},
	shim: {
		'jquery-ui': ['css!./lib/jquery-ui-1.12.1/jquery-ui.css', 
					  'css!./lib/jquery-ui-1.12.1/jquery-ui.theme.css']
	},
	map: {
		'*': {
			'css': './lib/require/css'
		}
	}
})
```

**3. i18n插件**

        https://github.com/requirejs/i18n
        
用于支持国际化多语言
    
``` javascript
//nls/messages.js
define({
  'zh': true,
  'en': true
})
//nls/zh/messages.js
define({
  'edit': '编辑'
})
//nls/en/messages.js
define({
  'edit': 'edit'
})
```
    
``` javascript
var language = document.cookie.match(/language=([^;]+)/)
var locale = 'zh'
if (language) {
	locale = language[1].split('_')[0]
}
requirejs.config({
	baseUrl: 'static/js',
	paths: {
		'jquery': './lib/jquery',
		'i18n': './lib/require/i18n'
	},
	config: {
		i18n: {
			locale: typeof locale !== 'undefined' ? locale : 'zh'
		}
	}
})

require(['jquery','i18n!./nls/messages'], function($, i18n){
	$("#user").after("<button class='btn btn-default'>"+i18n.edit+"</button>")
})
```

## 打包

在开发阶段，随着 `js` 框架和库的引入，页面 `js` 的加载个数就越来越多，严重影响页面的响应速度，于是我们就需要对 `js` 和 `css` 打包

    https://github.com/requirejs/requirejs

使用其中的 `r.js`

**1. 打包单个文件**

    r.js -o baseUrl=js name=app out=build.js
    
或者

    node r.js -o baseUrl=js name=app out=build.js
    

**2. 打包多个文件，使用配置文件**

    node r.js -o app.build.js

``` javascript
({
	appDir: './static',
	baseUrl: './js',
	dir: './build',
	mainConfigFile: './static/js/require.config.js',
	name: 'app'
})
```

`appDir` 要打包的根目录

`baserUrl` js文件所在的目录

`dir` 打包后的输出目录

`mainConfigFile` requirejs的配置文件

`name` 要打包的模块

**3. 打包多模块**

使用`modules`，数组列出所有需要打包的模块，当打包一个模块时，默认会打包所有依赖的模块

``` javascript
({
	appDir: './static',
	baseUrl: './js',
	dir: './build',
	optimize: 'uglify',
	mainConfigFile: './static/js/require.config.js',
	modules: [{
	    name: 'app'
	},{
	    name: 'user'
	}]
})
```

**参数设置**

`include` 添加依赖

`includeRequire` 不打包额外添加依赖

`exclude` 移除依赖

`excludeShallow` 浅移除依赖

`uglify` 打包时压缩，默认 `none` 不被压缩

**4. 使用插件如何打包**

- text插件

配置文件设置 `inlineText: false` 

- css插件
    
        https://github.com/guybedford/require-css
    
引入 `css-builder` 和 `normalize`， 通过其将css文件和模块一起打包

**5. npm打包**

`npm init` 生成 `package.json` 文件

设置
``` json
"scripts": {
    "package": "node r.js -o app.build.js"
}
```

`npm run package` 即可完成打包


License
---

MIT
