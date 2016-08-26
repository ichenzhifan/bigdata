

"use strict"

module.exports = [
  "$scope","$stateParams","$state",
  ($scope,$stateParams,$state)=>{
  	  if(!$stateParams.param){
  	  	$state.go('dashboard.data')
  	  	return
  	  }
      $scope.config = $stateParams.param.config 
    
  }
]