"use strict";

module.exports = [
  "$scope",'userData','$uibModalInstance','groupResourceService','Notification',
  ($scope,userData,$uibModalInstance,groupResourceService,Notification)=>{
    $scope.title = '确定要删除【'+userData.group_name+'】?'
    $scope.ok = () => {
      groupResourceService.deleteGroup(userData.group_id).then(()=>{
        var index = groupResourceService.getIndexInGroupList()
        $uibModalInstance.close(userData)
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