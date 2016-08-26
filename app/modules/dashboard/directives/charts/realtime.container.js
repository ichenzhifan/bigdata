'use strict';
module.exports = ['dataParserService','$timeout','reqDataService','$rootScope',
(dataParserService,$timeout,reqDataService,$rootScope) => {
  return{
    restrict: 'E',
    replace: true,
    require:'?ngModel',
    templateUrl: 'modules/dashboard/views/charts/realtime.container.html',
    link: ($scope, el, attrs, ctrl) => {
        if(!ctrl) return
        var allData,timeoutId
        ,timeflag
        ,loadChart
        ,colors=['#24CBE5', '#50B432', '#ED561B', '#7cb5ec','#058DC7', '#FF9655', '#64E572',
        '#f15c80', '#e4d354', '#8085e8', '#8d4653'] 
        $scope.chartopt = $scope.param.param.charts[0]
        $scope.activeIndex = 0
        $scope.chartopt.chartval && ($scope.param.param.config.chartval = $scope.chartopt.chartval)
        $scope.select = ($event,opt,index) =>{
            var $ele = $($event.target).parent()
            $ele.siblings().removeClass('active')
            $ele.addClass('active')
            $scope.activeIndex = index
            $scope.chartopt = opt
            $scope.$parent.tableTitles = opt.tabletitles
            colors.push(colors.splice(0,1)[0])
            if(opt.chartval){
                $scope.param.param.config.chartval = opt.chartval
                $scope.loadContentData()
            }else{
               loadChart() 
            }
            
        }
        ctrl.$render = ()=>{
            if(!ctrl.$viewValue) return
           loadChart(ctrl.$viewValue) 
        }
        var loadChart = (data)=>{
            if(data) allData = data
            if(!allData) return 
            // console.log('allData :',allData)
            var flag = !!data
            dataParserService.parseData(allData.data,$scope.chartopt,$scope.tableTitles,colors)
            $rootScope.$broadcast('changeOptionList',$scope.chartopt.option.series,flag)
            $scope.refresh($scope.chartopt.option,flag)
            timeoutId && $timeout.cancel(timeoutId) 
            if($scope.chartopt.refresh){
                timeoutId = $timeout(()=>{
                    // console.log('loadData')
                    $scope.loadContentData(true)
                },$scope.chartopt.interval || 5000)
            }
        }
        $scope.$on('refreshChart',($event,option)=>{
            colors.push(colors.splice(0,1)[0])
            $scope.reload(option,colors)
        })
        $timeout(()=>{
            $scope.loadContentData()
        })
        $scope.$on('$destroy',()=>{
            timeoutId && $timeout.cancel(timeoutId)
            timeoutId = null
        })
    }
  }

}]