'use strict';
module.exports = ['reqDataService','$timeout',
(reqDataService,$timeout) => {
  return{
    restrict: 'E',
    replace: true,
    templateUrl: 'modules/content/views/stand/general.html',
    link: ($scope, el, attrs, ctrl) => {
      // console.log('config:',$scope.config)
      // $scope.generalData = {}
      // console.log('$scope.param.param :',$scope.param.param)
      if($scope.param.param.charts && $scope.param.param.charts[0].tabletitles){
        $scope.tableTitles = $scope.param.param.charts[0].tabletitles
      }else{
        $scope.tableTitles = $scope.param.param.table.titles
      }
      $scope.otableTitles = $scope.tableTitles
      $scope.isLoading = false


      /**
       * @ngdoc function
       * @methodOf content.directive:general
       * @name loadContentData
       * @description 调用reqDataService.reqGeneralData加载数据,需传入$scope.param.param.config,$scope.param.param.urlPrefix</br>
       * $scope.param.param.config  请求参数 </br>
       * $scope.param.param.urlPrefix 请求url后缀（可选） </br>
       * 数据请求回来后赋值给generalData
       */
      $scope.loadContentData = ()=>{
         $scope.isLoading = true
         reqDataService.reqGeneralData($scope.param.param.config,$scope.param.param.urlPrefix).then((data)=>{
          $scope.ogeneralData = data
          $scope.generalData = data
          // $scope.loadChart(data)
          // $scope.loadTable(data)
          
        }).finally(()=>{
          $scope.isLoading = false
        })
      }
      // var watchVar = $scope.$watch('param.param.config',(newVal,oldVal)=>{
      //   if(newVal === oldVal) return
      //     $scope.loadContentData()
      // },true)
      // $timeout(()=>{
  	   //  // reqDataService.reqGeneralData($scope.param.param.config).then((data)=>{
  	   //  // 	$scope.loadChart(data)
  	   //  // 	$scope.loadTable(data)
      // 	// })
      //   $scope.loadContentData()
      // })
      $scope.$on('$destroy',()=>{
        // watchVar()
      })
    }
  }

}]