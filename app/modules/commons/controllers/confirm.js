"use strict";

module.exports = [
  "$scope",'userData','$uibModalInstance','title',
  ($scope,userData,$uibModalInstance,title)=>{
  	$scope.title = title
  	$scope.ok = () => {
  	  $uibModalInstance.close(userData)
  	};

  	$scope.cancel =  () => {
  	  $uibModalInstance.dismiss('cancel')
  	};

  	$scope.$on('$destroy',()=>{
  		$uibModalInstance.dismiss('cancel')
  	})
  }
]