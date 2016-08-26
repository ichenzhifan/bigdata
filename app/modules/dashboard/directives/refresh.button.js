'use strict';
module.exports = ['$timeout',
($timeout) => {
  return{
    restrict: 'E',
    replace: true,
    templateUrl: 'modules/dashboard/views/refresh.button.html',
    link: (scope, el, attrs, ctrl) => {
      $timeout(()=>{
        scope.param.param.config.dt = ''
        scope.loadContentData()
      }) 
    }
  }

}]