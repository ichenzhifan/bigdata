"use strict";

module.exports = [
  "$scope",'userData','tableData','$uibModalInstance','groupResourceService','Notification',
  ($scope,userData,tableData,$uibModalInstance,groupResourceService,Notification)=>{
  	$scope.group = {
      remarks:''
    }
  	$scope.ok = () => {
  	  groupResourceService.addGroup($scope.group).then((resp)=>{
        tableData.oTable && (tableData.oTable.fnDestroy(),tableData.oTable = null)
  	  	userData.push($scope.group)
        Notification.success('新增群组【'+$scope.group.group_name+'】成功')
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