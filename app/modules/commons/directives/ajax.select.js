'use strict';
module.exports = ['MobileService',
(MobileService) => {
  return{
    restrict: 'E',
    replace: true,
    scope:{
        url:'@',
        paramName:'@',
        config:'=',
        urlBody:'@',
        id:'@',
        loadData:'&',
        autoLoad:'@'
    },
    templateUrl: 'modules/commons/views/ajax.select.html',
    link:(scope, el, attrs,ngModelCtrl) => {
        scope.optionlist = []
        scope.selectItem =  {
            name:'加载中...'
        }
        scope.value = ''
        MobileService.one(scope.url).post('',scope.urlBody).then((resp)=>{
            scope.optionlist = resp.data
            let index = resp.index || 0
            scope.selectItem = resp.data[index]
            scope.config[scope.paramName] = scope.selectItem.value
            console.log('autoLoad :',scope.autoLoad)
            if(scope.autoLoad)
                scope.loadData()
        })
        scope.choose = ($event,ele)=>{
            scope.selectItem = ele
            scope.config[scope.paramName] = ele.value
            scope.loadData()
            
        }
        scope.preventDismiss = ($event)=>{
            $event.preventDefault()
            $event.stopPropagation()
          }
    }
  }

}]