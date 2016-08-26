"use strict"

module.exports = [
  "$scope","$stateParams","$state",
  ($scope,$stateParams,$state)=>{
  	  if(!$stateParams.param){
  	  	$state.go('dashboard.app')
  	  	return
  	  }
      $scope.config = $stateParams.param.config
      
  } 
]