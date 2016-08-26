"use strict";

module.exports = [
  "$scope",'user','$uibModalInstance','MobileService','Notification',
  ($scope,user,$uibModalInstance,MobileService,Notification)=>{
    $scope.obj = {
      originPassword:'',
      newPassword:''
    }
  	$scope.ok = () => {
      // if($scope.obj.originPassword !== user.password){
      //   Notification.error("旧密码输入错误")
      //   return 
      // }
      if($scope.obj.newPassword !== $scope.obj.confirmNewPassword){
        Notification.error("两次密码输入不一致")
        return 
      }
      MobileService.one(MobileService.getAppPrefix()+'/admin/users',user.user_id).one('password').customPOST({
        data:$scope.obj}).then(()=>{
        // user.password = $scope.obj.newPassword
        Notification.success('密码修改成功')
        $uibModalInstance.close()
      })
     //  userResourceService.addUser({
     //    data:$scope.user
     //  }).then((resp)=>{
  	  // 	  Notification.success('新增用户【'+$scope.user.name+'】成功')
     //      userTable.oTable && (userTable.oTable.fnDestroy(),userTable.oTable = null)
  	  // 	  userData.push(resp.data)
     //      console.log('userData :',userData)
     //      $uibModalInstance.close()
  	  // })
	};

	$scope.cancel =  () => {
	  $uibModalInstance.dismiss('cancel')
	};

	$scope.$on('$destroy',()=>{
		$uibModalInstance.dismiss('cancel')
	})
  }
]