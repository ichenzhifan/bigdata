'use strict';
module.exports = [
'$timeout',($timeout) => {
  return{
    restrict: 'A',
    link: ($scope, el, attrs, ctrl) => {
      console.log('in finish render')
      if ($scope.$last === true) {
        var finishFunc=$scope.$parent[attrs.finishRender]
        if(finishFunc)
        {
          $timeout(finishFunc(),300)
        }
      }
    }
  }

}]