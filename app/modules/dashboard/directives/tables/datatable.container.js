'use strict';
module.exports = ['$compile',
($compile) => {
  return{
    restrict: 'E',
    replace: true,
    templateUrl: 'modules/dashboard/views/tables/datatable.container.html',
    link: ($scope, el, attrs, ctrl) => {
    	var tableConfig = $scope.param.param.table,type
    	type = tableConfig.type || 'datatable'
    	var tar = $compile('<'+type+' ng-model="generalData">'+'</'+type+'>')($scope)
    	el.html(tar) 
    }
  }

}]