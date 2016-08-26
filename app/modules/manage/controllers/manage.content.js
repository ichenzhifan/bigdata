"use strict"

module.exports = [
  "$scope","$stateParams","$state",
  ($scope,$stateParams,$state)=>{
  	// console.log('$stateParams :',$stateParams)
  	  if(!$stateParams.param){
  	  	$state.go('dashboard.manage')
  	  	return
  	  }
      $scope.config = $stateParams.param.config
      
  } 
]