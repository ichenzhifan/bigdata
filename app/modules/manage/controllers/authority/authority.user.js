"use strict";

module.exports = [
  "$scope",'userData','reqData','$uibModalInstance','authorityResourceService','Notification',
  ($scope,userData,reqData,$uibModalInstance,authorityResourceService,Notification)=>{

    var groupMap = authorityResourceService.getGroupMap()
    reqData.forEach((user)=>{
      user.group_name = groupMap[user.group_id]
    })
  	$scope.tableData = {
        data:reqData,
        titles:[
            {title:'是否拥有该权限'},
            {title:'用户ID'},
            {title:'用户姓名'},
            {title:'用户账号'},
            {title:'用户群组'},
            {title:'备注'}
        ]
    } 
    $scope.ok = () => {
        reqData.forEach((d)=>{
          d.own = d.own ? 1 : 0
        })
        authorityResourceService.editAuthorityUsers(userData.popedom_id,{data:reqData}).then(()=>{
            Notification.success('权限【'+userData.title+'】指派用户成功')
            $uibModalInstance.close()
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