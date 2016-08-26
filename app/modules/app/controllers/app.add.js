"use strict";

module.exports = [
  "$scope",'appData','appTable','$uibModalInstance','appResourceService','Notification',
  ($scope,appData,appTable,$uibModalInstance,appResourceService,Notification)=>{
  	$scope.app = { 
  		remarks:''
  	}
  	// $scope.group = appResourceService.getGroupList()
  	$scope.ok = () => {
      appResourceService.addApp({ 
        data:$scope.app
      }).then((resp)=>{
  	  	  Notification.success('新增应用【'+$scope.app.application_name+'】成功')
          appTable.oTable && (appTable.oTable.fnDestroy(),appTable.oTable = null)
  	  	  appData.push(resp.data)
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