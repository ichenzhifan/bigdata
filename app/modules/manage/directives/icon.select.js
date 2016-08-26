'use strict';
module.exports = ['MenuIcon',
(MenuIcon) => {
  return{
    restrict: 'E',
    replace: true,
    scope:{
        data:'=',
        sid:'@'
    },
    templateUrl: 'modules/manage/views/icon.select.html',
    compile:(tel,tAttrs)=>{
		return (scope, el, attrs,ngModelCtrl) => {
			scope.icons = MenuIcon
			scope.chooseIcon = ($event,icon)=>{
				scope.data = icon
			}
	    }
    }
    
    
  }

}]