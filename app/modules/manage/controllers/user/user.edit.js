"use strict";

module.exports = [
  "$scope",'userData','reqData','$uibModalInstance',"SelectList",'userResourceService','Notification',
  ($scope,userData,reqData,$uibModalInstance,SelectList,userResourceService,Notification)=>{
    $scope.user = reqData
    $scope.user.originPassword = $scope.user.password
    $scope.user.password = ''
  	$scope.group = userResourceService.getGroupList()
    // $scope.user.group = userResourceService.getGroupById($scope.user.group_id,$scope.group)
    $scope.collapsed = false
    /**
       * @ngdoc function
       * @methodOf manage.controller:userEditCtrl
       * @name changePassword
       * @description 启用密码修改功能
       */
    $scope.changePassword = ()=>{
      $scope.collapsed = !$scope.collapsed
      if(!$scope.collapsed){
        $scope.user.password  = ''
        $scope.user.passwordConfirm = ''
      }
    }
    /**
       * @ngdoc function
       * @methodOf manage.controller:userEditCtrl
       * @name ok
       * @description 向后台提交修改后的用户信息
       */
  	$scope.ok = () => {
      var err = userResourceService.valid($scope.user)
      if(err){
        Notification.error(err)
        return 
      }
      if($scope.user.password 
        && $scope.user.password !== $scope.user.passwordConfirm){
        Notification.error('两次输入的新密码不一样,请重新输入')
        return 
      }

      // $scope.user.originPassword  = ''
  	  userResourceService.editUser({
        data:$scope.user
      }).then((resp)=>{
  	  		Notification.success('用户【'+$scope.user.name+'】修改成功')
          angular.extend(userData,$scope.user)
          $uibModalInstance.close($scope.user)
  	  })
  	};
    /**
       * @ngdoc function
       * @methodOf manage.controller:userEditCtrl
       * @name cancel
       * @description 退出用户信息编辑模态框
       */
  	$scope.cancel =  () => {
  	  $uibModalInstance.dismiss('cancel')
  	};

  	$scope.$on('$destroy',()=>{
  		$uibModalInstance.dismiss('cancel')
  	})
  }
]