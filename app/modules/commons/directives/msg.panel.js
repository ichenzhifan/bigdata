'use strict';
module.exports = ['$rootScope','$timeout',
($rootScope,$timeout) => {
  return{
    restrict: 'E',
    replace: true,
    // scope:{
    //     msg:'='
    // },
    templateUrl: 'modules/commons/views/msg.panel.html',
    link:(scope, el, attrs) => { 
        scope.flg = false
        var timeHandler,change = ()=>{
            timeHandler && $timeout.cancel(timeHandler)
            timeHandler = $timeout(()=>{
                scope.flg = false
            },5000)
        }
        scope.$on('showCrashError',($event,msg)=>{
            if(!msg || msg.length == 0) return
            scope.title = msg[0].title
            scope.content = msg[0].content
            scope.flg = true
            change()
        })
        scope.hide = ($event)=>{
            $event.preventDefault()
            $event.stopPropagation()
            timeHandler && $timeout.cancel(timeHandler)
            timeHandler = null
            scope.flg = false
        }
    }
    
  }

}]