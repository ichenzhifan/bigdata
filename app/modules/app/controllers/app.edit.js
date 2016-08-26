"use strict";

module.exports = [
  "$scope",'appData','reqData','$uibModalInstance','Notification','appResourceService',
  ($scope,appData,reqData,$uibModalInstance,Notification,appResourceService)=>{
  	$scope.app = reqData
  	$scope.ok = () => {
  		appResourceService.editApp({data:$scope.app}).then((resp)=>{
	  		Notification.success('应用【'+$scope.app.application_name+'】修改成功')
	        angular.extend(appData,$scope.app)
	        $uibModalInstance.close($scope.app)
	    })
	};

	$scope.cancel =  () => {
	  $uibModalInstance.dismiss('cancel')
	};

	$scope.$on('$destroy',()=>{
		$uibModalInstance.dismiss('cancel')
	})
  }
]