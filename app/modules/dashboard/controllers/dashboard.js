"use strict"

module.exports = [
  "$scope","mePageLoading","$stateParams","MemoryCache","Memorykey","MobileService","dashboardService","Notification","ScrollService",
  ($scope,mePageLoading,$stateParams,MemoryCache,Memorykey,MobileService,dashboardService,Notification,ScrollService)=>{
  	$scope.asidemenu = {
  		spinned:false
  	}
    $scope.user = MemoryCache.get(Memorykey.USER_KEY)
    if($stateParams.apps && $stateParams.apps.length > 0){
      $scope.appList = $stateParams.apps
    }else{
      $scope.appList = MemoryCache.get(Memorykey.APPS_KEY)
    }
    if($scope.appList.length == 0){
      Notification.error('未分配应用权限',5000)
    }
    $scope.$on('changeCurApp',(event,app)=>{
      $scope.curApp = app
    })
    $scope.curApp =  MemoryCache.get(Memorykey.CUR_APP_KEY) || {name:$scope.appList[0]}
    MemoryCache.set(Memorykey.CUR_APP_KEY,$scope.curApp)
    // ScrollService.init()


    // $scope.$on('$destroy',()=>{
    //   ScrollService.destroy()
    // })
  	// dashboardService.changeApp($scope.curApp.name) 
    
  	// mePageLoading.registerAnimater('#dashboard-content',$('#dashboard-content'))
	  // $scope.status = {
	  //   isopen: false
	  // };

	  // $scope.toggled = function(open) {
	  //   $log.log('Dropdown is now: ', open);
	  // };

	  // $scope.toggleDropdown = function($event) {
	  //   $event.preventDefault();
	  //   $event.stopPropagation();
	  //   $scope.status.isopen = !$scope.status.isopen;
	  // };

	  // $scope.data = []
	  // $scope.curChild = ''
	  // $scope.panel_title=" >> 页面标题"
   //    $scope.$on('openmenu',(event,data)=>{
   //    	$scope.panel_title = data.text
   //      $scope.data = data.childs
   //      $scope.curChild =  data.childs[0].name
   //      console.log('$scope.curChild :',$scope.curChild)
   //    })
	  
  }
]