'use strict';
module.exports = [
() => {
  return{
    restrict: 'E',
    replace: true,
    scope:{
    	text:'@'
    },
    templateUrl: 'modules/commons/views/horse.rise.html',
    compile:(tel,tAttrs)=>{
		return (scope, el, attrs,ngModelCtrl) => {
 
	    }
    }
    
    
  }

}]