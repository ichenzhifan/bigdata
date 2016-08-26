'use strict';
module.exports = [
'$compile',($compile) => {
  return{
    restrict: 'E',
    replace: true,
    template: '<div class="content-wrapper"></div>',
    link:($scope, el, attrs, ctrl) => {
        if(!attrs.param) return
    	attrs.param && ($scope.param = JSON.parse(attrs.param))
        if(attrs.direct){
        	var tar = $compile('<'+attrs.direct+'>'+'</'+attrs.direct+'>')($scope)
        	el.html(tar)
        }
    }
  }

}]