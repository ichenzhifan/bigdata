"use strict"

module.exports = [
  "$scope",'menuMock','dashboardService',
  ($scope,menuMock,dashboardService)=>{
  	$scope.allmenus = dashboardService.getMenus()
  	$scope.menutree = $scope.allmenus.menus
  	// $scope.menutree = menuMock
  	// $scope.allmenus = menuMock 
  	
	  
  }
]