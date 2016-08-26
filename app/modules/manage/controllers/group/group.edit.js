"use strict";

module.exports = [
  "$scope",'groupData','reqData','$uibModalInstance','Notification','groupResourceService',
  ($scope,groupData,reqData,$uibModalInstance,Notification,groupResourceService)=>{
  	$scope.group = reqData
  	$scope.ok = () => {
  		groupResourceService.editGroup({data:$scope.group}).then((resp)=>{
	  		Notification.success('群组【'+$scope.group.group_name+'】修改成功')
	        angular.extend(groupData,$scope.group)
	        $uibModalInstance.close($scope.group)
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