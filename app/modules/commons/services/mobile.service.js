"use strict"
module.exports = [
  '$rootScope', '$cookies', 'Restangular', 'Env', 'Memorykey','MemoryCache',
  'ServerCurrent', '$state' ,'Notification','liziService',
  ($rootScope, $cookies, Restangular, Env,Memorykey, MemoryCache, ServerCurrent, $state,Notification,liziService) => {
    

    var service =  Restangular.withConfig((config) => {
      config.setBaseUrl(ServerCurrent.mobile_server)
      // config.setRequestSuffix('helios') 
      var token = MemoryCache.get(Memorykey.TOKEN_KEY)
      token && config.setDefaultHeaders({token: token}) 
      // config.setDefaultHeaders({'Content-Type': 'application/json'});
      config.setResponseInterceptor((data,operation,what,url,response,deferred)=>{
        if(data.status && data.status != 200){ 
          Notification.error(data.message)
          data.data = []
          deferred.reject(data.message)
          if(data.status == 401){
             service.clearCache()
          }
          return
        }
        deferred.resolve(data)
      })
      config.setErrorInterceptor((error) => {
        if(error.status == -1){
          Notification.error('服务器异常，请联系赖顺小朋友')
        }else{
          Notification.error(error.status+' : '+error.statusText )
        }
        return true
      })          
      // config.setDefaultHttpFields({
      //   withCredentials: true
      // })
    })

    /**
       * @ngdoc function
       * @methodOf common.service:MobileService
       * @name clearCache
       * @description 清除MemoryCache里面的内容
       * 
       */
    service.clearCache = ()=>{
      MemoryCache.remove(Memorykey.USER_KEY)
      MemoryCache.remove(Memorykey.TOKEN_KEY)
      MemoryCache.remove(Memorykey.APPS_KEY)
      MemoryCache.remove(Memorykey.CUR_APP_KEY)
      liziService.reset()
      service.setDefaultHeaders({}) 
      $state.go('login') 
    }
    /**
       * @ngdoc function
       * @methodOf common.service:MobileService
       * @name signOut
       * @description 用户退出
       * 
       */
    service.signOut = ()=>{
      service.one('/logout',MemoryCache.get(Memorykey.USER_KEY).username).get().then((resp)=>{
      })
      service.clearCache()
    }
    /**
       * @ngdoc function
       * @methodOf common.service:MobileService
       * @name getAppPrefix
       * @description 获取MemoryCache中存储的当前应用
       * 
       * @return {string} 应用名称
       */
    service.getAppPrefix = ()=>{
      return MemoryCache.get(Memorykey.CUR_APP_KEY).name
    }
    /**
       * @ngdoc function
       * @methodOf common.service:MobileService
       * @name getAppPrefix
       * @description 改变MemoryCache中存储的当前应用
       *
       * @param {string} app 应用名称
       */
    service.changeAppPrefix = (app)=>{
      MemoryCache.set(Memorykey.CUR_APP_KEY,app)
    }

    return service
  }
]
  