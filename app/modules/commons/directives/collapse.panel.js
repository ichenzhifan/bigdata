'use strict';
module.exports = ['$rootScope','$timeout',
($rootScope,$timeout) => {
  return{
    restrict: 'E',
    replace: true,
    scope:{
        data:'='
    },
    templateUrl: 'modules/commons/views/collapse.panel.html',
    link:(scope, el, attrs,ngModelCtrl) => { 
        $timeout(()=>{
            scope.data[0].collapsed = false
        })

        scope.itemClick = (item,list)=>{
            let tmp = item.collapsed
            list.forEach((ele)=>{
                ele.collapsed = true
            })
            item.collapsed = !tmp
        }
        scope.$on('$destroy',()=>{
            scope.data.forEach((d)=>{
                d.collapsed = true
            })
        })
    }
    
  }

}]