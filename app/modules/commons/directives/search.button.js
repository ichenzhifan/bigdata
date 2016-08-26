'use strict';
module.exports = ['$timeout',
($timeout) => {
  return{
    restrict: 'E',
    replace: true,
    scope:{
        data:'=',
        config:'=',
        loadContentdata:'&'
    },
    templateUrl: 'modules/commons/views/search.button.html',
    link:(scope, el, attrs,ngModelCtrl) => {
        scope.search = ''
        scope.doSearch = ()=>{
            scope.config[scope.data.param] = scope.search
            scope.loadContentdata()
        }
    }
    
    
  }

}]