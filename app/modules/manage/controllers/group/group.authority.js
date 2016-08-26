"use strict";

module.exports = [
  "$scope",'userData','reqData','$uibModalInstance','utilManageService','groupResourceService','Notification',
  ($scope,userData,reqData,$uibModalInstance,utilManageService,groupResourceService,Notification)=>{
  	// $scope.role = userData
  	$scope.authorityData = utilManageService.wrapperTree(reqData.data)
  	$scope.ok = () => {
  	  utilManageService.unwrapperTree($scope.authorityData[0])
  	  groupResourceService.editGroupAuthorites(userData.group_id,{data:$scope.authorityData[0].nodes}).then(()=>{
  	  	Notification.success('群组【'+userData.group_name+'】权限信息修改成功')
  	  	$uibModalInstance.close()
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