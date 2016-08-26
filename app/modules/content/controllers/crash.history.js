"use strict";

module.exports = [
  "$scope",'crashData','infoData','$uibModalInstance','Notification',
  ($scope,crashData,infoData,$uibModalInstance,Notification)=>{
    $scope.tableData = infoData
  	$scope.ok = () => {
      $uibModalInstance.close()
  	};

  	$scope.cancel =  () => {
  	  $uibModalInstance.dismiss('cancel')
  	};

  	$scope.$on('$destroy',()=>{
  		$uibModalInstance.dismiss('cancel')
  	})
  }
]