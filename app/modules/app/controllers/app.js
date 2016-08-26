"use strict"

module.exports = [
  "$scope","AppMenu","LoadingService","$state","dashboardService",
  ($scope,AppMenu,LoadingService,$state,dashboardService)=>{
  	$scope.menutree = AppMenu
  	$scope.allmenus = AppMenu 
  	$scope.loadingObj = LoadingService.getIsLoading()
  	// $state.go('dashboard.app.list',{param:{config:dashboardService.getFirstMenu($scope.allmenus)}})
  }
]