'use strict';
module.exports = ['$rootScope','Notification',
($rootScope,Notification) => {
  return{
    restrict: 'E',
    replace: true,
    scope:{
    },
    templateUrl: 'modules/commons/views/msg.tip.html',
    link:(scope, el, attrs,ngModelCtrl) => {
        scope.msg = Notification.getMessage()
        var $tarel = el.find('.tip-content'),tm,interval
        scope.$watch('msg.valid',(newVal,oldVal)=>{
            if(!newVal) return
            $tarel.html(scope.msg.msg)
            el.removeClass('ok error').addClass('show '+scope.msg.clz)
            if(scope.msg.interval){
                interval = scope.msg.interval
            }else{
                interval = 2000
            }
            if(tm){clearTimeout(tm)}
            tm = setTimeout(()=>{
                el.removeClass('show')
                scope.msg.valid = undefined
                scope.$apply()
            },interval)
        })
        scope.$on('$destroy',()=>{
             if(tm){clearTimeout(tm)}
        })
    }
    
  }

}]