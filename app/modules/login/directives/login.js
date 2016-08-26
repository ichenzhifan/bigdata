'use strict';
module.exports = ['$timeout','scrollAnimate',
($timeout,scrollAnimate) => {
  return{
    restrict: 'E',
    replace: true,
    // scope:{
    // },
    controller:'loginCtrl',
    templateUrl: 'modules/login/views/login.panel.html',
    compile:(tEl, tAttrs)=>{
      return  (scope, el, attrs, ctrl) => {

      }

    }
    
  }

}]