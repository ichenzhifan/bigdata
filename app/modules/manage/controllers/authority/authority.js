"use strict";

module.exports = [
  "$scope",'userData','$uibModalInstance',
  ($scope,userData,$uibModalInstance)=>{
  	$scope.role = userData
  	$scope.ok = () => {
	  $uibModalInstance.close($scope.role)
	};

	$scope.cancel =  () => {
	  $uibModalInstance.dismiss('cancel')
	};

	$scope.$on('$destroy',()=>{
		$uibModalInstance.dismiss('cancel')
	})
  }
]