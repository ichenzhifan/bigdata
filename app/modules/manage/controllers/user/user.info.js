"use strict";

module.exports = [
  "$scope",'userData','reqData','$uibModalInstance','utilManageService','userResourceService','Notification',
  ($scope,userData,reqData,$uibModalInstance,utilManageService,userResourceService,Notification)=>{
  	// $scope.user = userData
  	$scope.tableData = {
  		// titles:[
  		// 	{title:'角色名称'},
    //         {title:'创建人'},
    //         {title:'角色描述'},
    //         {title:'创建时间'}
  		// ],
  		// data:[
	  	// 	['BI开发者','连凯','开发者拥有一切权限','2015-07-11 07:23:38'],
	  	// 	['BI开发者','连凯','开发者拥有一切权限','2015-07-11 07:23:38'],
	  	// 	['BI开发者','连凯','开发者拥有一切权限','2015-07-11 07:23:38'],
	  	// 	['BI开发者','连凯','开发者拥有一切权限','2015-07-11 07:23:38'],
	  	// 	['BI开发者','连凯','开发者拥有一切权限','2015-07-11 07:23:38'],
	  	// 	['BI开发者','连凯','开发者拥有一切权限','2015-07-11 07:23:38']
	  	// ],
	  	AuthorityData:utilManageService.wrapperTree(reqData.data)
  	}
    /**
     * @ngdoc function
     * @methodOf manage.controller:userInfoCtrl
     * @name ok
     * @description 修改用户权限信息
     */
  	$scope.ok = () => {
      utilManageService.unwrapperTree($scope.tableData.AuthorityData[0])
  	  userResourceService.editUserAuthorities(userData.user_id,{data:$scope.tableData.AuthorityData[0].nodes}).then(()=>{
  	  	Notification.success('用户【'+userData.name+'】权限信息修改成功')
  	  	$uibModalInstance.close() 
  	  })
  	  // $uibModalInstance.close($scope.user)
  	};

    /**
       * @ngdoc function
       * @methodOf manage.controller:userInfoCtrl
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