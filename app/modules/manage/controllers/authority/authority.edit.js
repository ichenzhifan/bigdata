"use strict";

module.exports = [
  "$scope",'userData','reqData','$uibModalInstance','authorityResourceService','Notification','MenuIcon','utilManageService',
  ($scope,userData,reqData,$uibModalInstance,authorityResourceService,Notification,MenuIcon,utilManageService)=>{
  	$scope.menuicons = MenuIcon
    // console.log('menuicons :',MenuIcon)
  	$scope.options = {
  		mode:'code'
  	}
  	$scope.authority = reqData.data
    $scope.authority.config || ($scope.authority.config = '{}')
    $scope.authority.configobj = JSON.parse($scope.authority.config)
  	// $scope.changeOptions = ()=>{
  	// 	$scope.options.mode = ($scope.options.mode == 'tree') ? 'code':'tree'
  	// }
    $scope.selectTpl = {name:'请选择模板'}
    $scope.tpls = [{
      name:'基础模板(带注释)'
    }
    ,{
      name:'基础模板(不带注释)',
      type:'base'
    }]
    $scope.chooseTpl = ($event,tpl)=>{
      $scope.selectTpl = tpl
      $scope.authority.configobj = utilManageService.getTplByType(tpl.type)
    }
  	$scope.ok = () => {
      $scope.authority.display = $scope.authority.display ? 1: 0
      $scope.authority.config = JSON.stringify($scope.authority.configobj)
      authorityResourceService.editAuthority({data:$scope.authority}).then((resp)=>{
        Notification.success('权限【'+$scope.authority.title+'】修改成功')
        angular.extend(userData,$scope.authority)
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