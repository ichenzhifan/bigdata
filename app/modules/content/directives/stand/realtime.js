'use strict';
module.exports = ['reqDataService','$timeout',
(reqDataService,$timeout) => {
  return{
    restrict: 'E',
    replace: true,
    templateUrl: 'modules/content/views/stand/realtime.html',
    link: ($scope, el, attrs, ctrl) => {

      if($scope.param.param.charts && $scope.param.param.charts[0].tabletitles){
        $scope.tableTitles = $scope.param.param.charts[0].tabletitles
      }

      // var data = []
      //   ,base = +new Date()
      //   ,prev = Math.random() * 300
      //   ,ele
      //   ,now
      // for (var i = 1; i < 150; i++) {
      //     ele = []
      //     now = new Date(base += 2000);
      //     ele.push([now.getHours(), now.getMinutes() + 1, now.getSeconds()].join(':'))
      //     var newVal = Math.round((Math.random() - 0.5) * 20 + prev)
      //     ele.push(newVal)
      //     newVal = Math.round((Math.random() - 0.5) * 20 + prev)
      //     ele.push(newVal)
      //     newVal = prev
      //     data.push(ele)
      // }
      // var loadData = ()=>{
      //   data.shift()
      //   ele = []
      //   now = new Date(base += 2000)
      //   var newVal = Math.round((Math.random() - 0.5) * 20 + prev)
      //   ele.push([[now.getHours(), now.getMinutes() + 1, now.getSeconds()].join(':')])
      //   // console.log('ele :',ele[0])
      //   ele.push(newVal)
      //   newVal = Math.round((Math.random() - 0.5) * 20 + prev)
      //   ele.push(newVal)
      //   prev = newVal
      //   data.push(ele)
      //   return {
      //     data:data
      //   }
      // }
      $scope.isLoading = false
      /**
       * @ngdoc function
       * @methodOf content.directive:realtime
       * @name loadContentData
       * @description 调用reqDataService.reqGeneralData加载数据,需传入$scope.param.param.config</br>
       * $scope.param.param.config  请求参数 </br>
       * 数据请求回来后赋值给generalData
       */
      $scope.loadContentData = (notLoading)=>{
        $scope.isLoading = !notLoading
        reqDataService.reqGeneralData($scope.param.param.config).then((data)=>{
          $scope.generalData = data
          
        }).finally(()=>{
          $scope.isLoading = false
        })
      }
      // $scope.loadContentData = ()=>{
      //   $scope.generalData = loadData()
      // }

      $scope.$on('$destroy',()=>{
        // watchVar()
      })
    }
  }

}]