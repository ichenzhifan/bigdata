"use strict";

module.exports = [
  "$scope",'appData','reqData','$uibModalInstance','appResourceService','Notification',
  ($scope,appData,reqData,$uibModalInstance,appResourceService,Notification)=>{
    $scope.tableData = {
        data:reqData,
        titles:[
            {title:'是否拥有该应用'},
            {title:'用户ID'},
            {title:'用户名称'},
            {title:'邮箱'},
            {title:'备注'} 
        ]
    } 
    $scope.ok = () => {
        reqData.forEach((d)=>{
          d.own = d.own ? 1 : 0
        })
        appResourceService.editApplicationUsers(appData.application_id,{data:reqData}).then(()=>{
            Notification.success('应用【'+appData.application_name+'】指派用户成功')
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