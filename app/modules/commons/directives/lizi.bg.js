'use strict';
module.exports = ['$rootScope','Notification', 'liziService','MemoryCache','Memorykey','$timeout',
($rootScope,Notification,liziService,MemoryCache,Memorykey,$timeout) => {
  return{
    restrict: 'E',
    replace: true,
    templateUrl: 'modules/commons/views/lizi.bg.html',
    link:(scope, el, attrs) => {
         
         $timeout(()=>{
            liziService.init(el.parent(),MemoryCache.get(Memorykey.USER_KEY).name,MemoryCache.get(Memorykey.CUR_APP_KEY).name)
         })
         scope.$on('changeText',($event,text)=>{
            liziService.changeText(text)
         })

         scope.$on('$destroy',()=>{
            liziService.destroy()
         })
    }
    
  }

}]