"use strict"

module.exports = [
  "$scope","$state","loginService", "MemoryCache","Memorykey","Storage",
  ($scope,$state,loginService,MemoryCache,Memorykey,Storage)=>{
 	$scope.appName = "数据统计平台"
 	$scope.isCheck = true
 	$scope.user = Storage.get(Memorykey.USER_KEY)
 	// $scope.user = MemoryCache.get(Memorykey.USER_KEY)
 	// if($scope.user){
 	// 	$state.go("dashboard")
 	// }else{
 	// 	$scope.user = {}
 	// }
 	$scope.check = ()=>{
        $scope.isCheck = !$scope.isCheck
    }
	$scope.submit = ()=>{
		// Storage.set(Memorykey.REMEMBER_ME,$scope.isCheck)
		if($scope.isCheck){
			Storage.set(Memorykey.USER_KEY,{ 
				username:$scope.user.username
			})
		}else{
			Storage.remove(Memorykey.USER_KEY)
		}
		loginService.login({data:$scope.user})
	}



  }
]