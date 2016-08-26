'use strict';
module.exports = ['$rootScope',
($rootScope) => {
  return{
    restrict: 'E',
    replace: true,
    scope:{
        iModel:'=',
        iText:'@'
    },
    templateUrl: 'modules/commons/views/ichecker.html',
    link:(scope, el, attrs,ngModelCtrl) => {
        scope.choose = ($event)=>{
            scope.iModel = !scope.iModel
            $event.preventDefault()
            $event.stopPropagation()
        }
    }
    
  }

}]