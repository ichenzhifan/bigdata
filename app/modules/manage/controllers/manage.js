"use strict"

module.exports = [
  "$scope","manageMock","manageRoot","LoadingService","$state","dashboardService",
  ($scope,manageMock,manageRoot,LoadingService,$state,dashboardService)=>{
  	// var digui  = (menus)=>{
  	// 	if(!menus) return
  	// 	var m
  	// 	for(var i = 0; i < menus.length; i++){
  	// 		m = menus[i]
  	// 		if(m.root && $scope.user.group_id !== 'root'){
  	// 			menus[i] = null
  	// 		}else{
  	// 			digui(m.nodes)
  	// 		}
  	// 	}
  	// }
  	// digui(manageMock)
    if($scope.user.group_id === 'root'){
      $scope.menutree = manageRoot
      $scope.allmenus = manageRoot
    } else{
      $scope.menutree = manageMock
      $scope.allmenus = manageMock
    }
  	
  	$scope.loadingObj = LoadingService.getIsLoading()
  	// $state.go('dashboard.manage.user',{param:{config:dashboardService.getFirstMenu($scope.allmenus)}})
  	
  }
]