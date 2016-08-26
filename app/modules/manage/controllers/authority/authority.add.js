"use strict";

module.exports = [
  "$scope",'userData','reqData','$uibModalInstance','authorityResourceService','Notification',
  ($scope,userData,reqData,$uibModalInstance,authorityResourceService,Notification)=>{
    reqData.menu_level = reqData.menu_level || 0
  	$scope.authority = {
  		parent_id:reqData.popedom_id ? reqData.popedom_id : '',
      remarks:'',
      menu_level:reqData.menu_level+1,
      url:'#',
      icon:'',
  		config:'',
      configobj:{}
  	}
  	$scope.options = {
  		mode:'code'
  	}
  	$scope.ok = () => {
      $scope.authority.display = $scope.authority.display ? 1: 0
      $scope.authority.config = JSON.stringify($scope.authority.configobj)
      authorityResourceService.addAuthority({data:$scope.authority}).then((resp)=>{
        Notification.success('新增权限【'+$scope.authority.title+'】成功')
        userData.nodes || (userData.nodes = [])
        userData.nodes.push($scope.authority)
        $uibModalInstance.close($scope.authority)
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