"use strict";

module.exports = [
  "$scope",'userData','$uibModalInstance',
  ($scope,userData,$uibModalInstance)=>{
  	$scope.authority = {
  		root:userData
  	}
    $scope.options = {
      mode:'code'
    }
    $scope.ok = () => {
    	  userData.push($scope.authority)
  	  $uibModalInstance.close($scope.authority)
  	};

  	$scope.cancel =  () => {
  	  $uibModalInstance.dismiss('cancel')
  	};

  	$scope.$on('$destroy',()=>{
  		$uibModalInstance.dismiss('cancel')
  	})
  }
]