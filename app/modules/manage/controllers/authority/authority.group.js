"use strict";

module.exports = [
  "$scope",'userData','reqData','$uibModalInstance','authorityResourceService','Notification',
  ($scope,userData,reqData,$uibModalInstance,authorityResourceService,Notification)=>{
    $scope.tableData = {
        data:reqData,
        titles:[
            {title:'是否拥有该权限'},
            {title:'群组ID'},
            {title:'群组名称'},
            {title:'群组描述'}
        ]
    } 
    $scope.ok = () => {
        reqData.forEach((d)=>{
          d.own = d.own ? 1 : 0
        })
        authorityResourceService.editAuthorityGroups(userData.popedom_id,{data:reqData}).then(()=>{
            Notification.success('权限【'+userData.title+'】指派群组成功')
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