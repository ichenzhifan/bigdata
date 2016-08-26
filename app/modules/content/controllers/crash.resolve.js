"use strict";

module.exports = [
  "$scope",'crashData','$uibModalInstance','Notification','Memorykey','MemoryCache','crashResource',
  ($scope,crashData,$uibModalInstance,Notification,Memorykey,MemoryCache,crashResource)=>{


    $scope.ok = () => {
      if(/^\d.\d.\d$/.test($scope.version)){
        var param = {
          crash_id:crashData[0]+'',
          resolve_version:$scope.version,
          resolve_day:moment().format('YYYYMMDD'),
          resolver:MemoryCache.get(Memorykey.USER_KEY).name,
          reason:$scope.crash_reason
        }
        crashResource.solveCrash({
          param:param
        }).then(()=>{
          Notification.success('crash解决成功')
          $uibModalInstance.close()
        })
      }else{
        Notification.error('输入的版本格式不正确')
      }
      
      
  	};



  	$scope.cancel =  () => {
  	  $uibModalInstance.dismiss('cancel')
  	};

  	$scope.$on('$destroy',()=>{
  		$uibModalInstance.dismiss('cancel')
  	})
  }
]