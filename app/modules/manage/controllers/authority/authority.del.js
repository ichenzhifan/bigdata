"use strict";

module.exports = [
  "$scope",'userData','$uibModalInstance',"title",
  ($scope,userData,$uibModalInstance,title)=>{
    $scope.title = title
    $scope.ok = () => {
      console.log('userData :',userData)
      var arr = (userData.parentNode && userData.parentNode.nodes) || userData.root,deli = -1
      arr.forEach((v,i)=>{
        if(v === userData){
          deli = i
          return false
        }
      })
      if(deli >= 0){
        arr.splice(deli,1)
      }
      $uibModalInstance.close(userData)
    };

    $scope.cancel =  () => {
      $uibModalInstance.dismiss('cancel')
    };

    $scope.$on('$destroy',()=>{
      $uibModalInstance.dismiss('cancel')
    })
  }
]