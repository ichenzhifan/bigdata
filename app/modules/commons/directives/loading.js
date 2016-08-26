'use strict';
module.exports = [
() => {
  return{
    restrict: 'E',
    replace: true,
    scope:{
    	isLoading:'=',
        loadClass:'@'
    },
    templateUrl: 'modules/commons/views/loading.html',
    compile:(tel,tAttrs)=>{
		return (scope, el, attrs,ngModelCtrl) => {
 
	    }
    }
    
    
  }

}]