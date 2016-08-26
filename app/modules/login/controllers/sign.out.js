"use strict"

module.exports = [
  "$uibModalInstance","MemoryCache","Memorykey","$scope",
  ($uibModalInstance,MemoryCache,Memorykey,$scope)=>{
  $scope.title = "【"+MemoryCache.get(Memorykey.USER_KEY).name+"】,你确定要注销吗?"
 	$scope.ok = () => {
 	  $uibModalInstance.close()
  	}

  	$scope.cancel =  () => {
  	  $uibModalInstance.dismiss('cancel')
  	}

  	$scope.$on('$destroy',()=>{
  		$uibModalInstance.dismiss('cancel')
  	})

  }
]