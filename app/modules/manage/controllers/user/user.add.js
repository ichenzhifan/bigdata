"use strict";

module.exports = [
  "$scope",'userData','userTable','$uibModalInstance','userResourceService','Notification','MemoryCache','Memorykey',
  ($scope,userData,userTable,$uibModalInstance,userResourceService,Notification,MemoryCache,Memorykey)=>{
  	$scope.user = {
      user_state : 1,
  		remark:''
  	}
    $scope.manager = MemoryCache.get(Memorykey.USER_KEY)
    if($scope.manager.group_id !== 'root'){
      $scope.user.group_id = $scope.manager.group_id
    }
  	$scope.group = userResourceService.getGroupList()
    /**
       * @ngdoc function
       * @methodOf manage.controller:userAddCtrl
       * @name ok
       * @description 向后台提交要新增的用户信息
       */
  	$scope.ok = () => {
  	  var err = userResourceService.valid($scope.user)
      if(err){
        Notification.error(err)
        return 
      }
  	  if($scope.user.password !== $scope.user.passwordConfirm){
        Notification.error('两次输入的新密码不一样,请重新输入')
        return 
      }
      userResourceService.addUser({
        data:$scope.user
      }).then((resp)=>{
  	  	  Notification.success('新增用户【'+$scope.user.name+'】成功')
          userTable.oTable && (userTable.oTable.fnDestroy(),userTable.oTable = null)
  	  	  userData.push(resp.data)
          console.log('userData :',userData)
          $uibModalInstance.close()
  	  })
	};
   /**
   * @ngdoc function
   * @methodOf manage.controller:userAddCtrl
   * @name cancel
   * @description 退出新增用户信息编辑模态框
   */
	$scope.cancel =  () => {
	  $uibModalInstance.dismiss('cancel')
	};

	$scope.$on('$destroy',()=>{
		$uibModalInstance.dismiss('cancel')
	})
  }
]