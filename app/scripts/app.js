"use strict"
var config = require('../modules/commons/config'),
content = require('../modules/content/index'),
common = require('../modules/commons/index'),
dashboard = require('../modules/dashboard'),
login = require('../modules/login'),
manage = require('../modules/manage'),
app = require('../modules/app'),
doc = require('../modules/doc'),
guide = require('../modules/guide')
angular
.module("MobileCMSApp",["vr.directives.slider","ngAnimate", "restangular", "ui.bootstrap","ui.router",
 "ngSanitize", "ngCookies","me-pageloading","ui.tree","ng.jsoneditor","gm.datepickerMultiSelect"
  , config.name
  , common.name
  , content.name
  , dashboard.name
  , login.name
  , manage.name
  , app.name
  , doc.name
  , guide.name]
)
.config([
  "$stateProvider", "$urlRouterProvider",
  ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.when("", "/dashboard")
    $urlRouterProvider.deferIntercept()
  }
])
.run([
  "$rootScope", "$urlRouter", "$state","$window","mePageLoading","MemoryCache","Memorykey",
  ($rootScope, $urlRouter, $state,$window,mePageLoading,MemoryCache,Memorykey) => {
    mePageLoading.registerAnimater('body',$(document.body))
    $rootScope.$on("$locationChangeSuccess", (e,path) => {
      if (MemoryCache.get(Memorykey.TOKEN_KEY)) {
        // debugger
        if(path.endsWith('login')){
          e.preventDefault()
          $state.go('dashboard')
          return
        }else{
          return $urlRouter.sync()
        }
        
      }else if(path.endsWith('login')){
          return $urlRouter.sync()
      }
      e.preventDefault()
      $state.go('login')
      // mePageLoading.hide()
      // $urlRouter.sync()  
    })
    $urlRouter.listen()
    $window.onresize = ()=>{
      $rootScope.$broadcast('resize')
    }
  }
])


// angular.bootstrap(document.body,['MobileCMSApp'])

// angular
// .module("MobileCMSApp",[]).run()


