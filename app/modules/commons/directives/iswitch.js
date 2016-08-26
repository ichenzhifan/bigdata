'use strict';
module.exports = ['$timeout','$compile',
($timeout,$compile) => {
  return{
    restrict: 'E',
    replace: true,
    scope:{
        ontext:'@',
        offtext:'@',
        flag:'=',
        onChange:'&'
    },
    templateUrl: 'modules/commons/views/iswitch.html',
    compile:(tel,tAttrs)=>{
		return (scope, el, attrs,ngModelCtrl) => {
			$timeout(()=>{
				var $spans = el.find('span'),maxWidth = 0,tmpwidth
				for(let i = 0; i < $spans.length; i++){
					tmpwidth = $($spans[i]).width()
					if(maxWidth  < tmpwidth){
						maxWidth = tmpwidth
					}
				}
				scope.basewidth = maxWidth+24
			})
			scope.choose = ()=>{
				scope.flag = !scope.flag
				scope.onChange && scope.onChange({
					flag:scope.flag
				})
			}
	    }
    }
    
    
  }

}]