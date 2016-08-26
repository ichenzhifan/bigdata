"use strict";

module.exports = [
  "$scope",'userData','$uibModalInstance','userResourceService','Notification',
  ($scope,userData,$uibModalInstance,userResourceService,Notification)=>{
    var text
  	if(userData.user_state){
      text = '锁定'
    }else{
      text = '解锁'
    }
    $scope.title = '确定要'+text+'【'+userData.name+'】?' 
    /**
     * @ngdoc function
     * @methodOf manage.controller:userDelCtrl
     * @name ok
     * @description 修改用户的锁定状态
     */
  	$scope.ok = () => {
      userResourceService.deleteUser({data:userData}).then((resp)=>{
        Notification.success(text+'用户【'+userData.name+'】成功')
        userData.user_state = resp.data.user_state
        $uibModalInstance.close(userData)
      })
  	};
    /**
       * @ngdoc function
       * @methodOf manage.controller:userDelCtrl
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