'use strict';
module.exports = ['dataParserService','$timeout','$rootScope',
(dataParserService,$timeout,$rootScope) => {
  return{
    restrict: 'E',
    replace: true,
    require:'?ngModel',
    templateUrl: 'modules/dashboard/views/charts/echart.container.html',
    link: ($scope, el, attrs, ctrl) => {
        if(!ctrl) return
        var allData
        ,loadChart 
        ,colors=['#24CBE5', '#50B432', '#ED561B', '#7cb5ec','#058DC7', '#FF9655', '#64E572',
        '#f15c80', '#e4d354', '#8085e8', '#8d4653'] 
        $scope.chartopt = $scope.param.param.charts[0]
        $scope.activeIndex = 0
        if($scope.param.param.tip){
            let htmlStr = $scope.param.param.tip.title+'<br>'
            $scope.param.param.tip.items.forEach((item)=>{
                htmlStr += `<span class="tip-item-title">${item.title}:</span>&nbsp;${item.content}<br>`
            })
            console.log('htmlStr :',htmlStr)
            $scope.tipHtml = htmlStr
        }
        $scope.chartopt.chartval && ($scope.param.param.config.chartval = $scope.chartopt.chartval)
        /**
         * @ngdoc function
         * @methodOf dashboard.directive:echartContainer
         * @name select
         * @description 切换当前显示的图表,并重新绘制图表
         * @param {Object} $event 图表配置信息
         * @param {Object} opt 配置信息
         * @param {Number} index 序号
         */
        $scope.select = ($event,opt,index) =>{
            var $ele = $($event.target).parent()
            $ele.siblings().removeClass('active')
            $ele.addClass('active')
            $scope.activeIndex = index
            $scope.chartopt = opt

            if(opt.tabletitles){
                $scope.$parent.tableTitles = opt.tabletitles
            }else{
                $scope.$parent.tableTitles = $scope.param.param.table.titles
            }
            $scope.$parent.otableTitles = $scope.$parent.tableTitles
            if(opt.chartval){
                $scope.param.param.config.chartval = opt.chartval
                $scope.loadContentData()
            }else{
               loadChart() 
            }
            // console.log('in chart scope :',$scope)
            // console.log('$scope.tableTitles in chart:',$scope.tableTitles)
            // $scope.$broadcast('reload')
        }
        ctrl.$render = ()=>{
            if(!ctrl.$viewValue) return
           loadChart(ctrl.$viewValue) 
        }

        loadChart = (data)=>{
            if(data) allData = data
            if(!allData) return
            if(!$scope.chartopt.unvisible){
                dataParserService.parseData(allData.data,$scope.chartopt,$scope.tableTitles,colors,$scope.param.param.config.dt)
                if($scope.chartopt.chartStatus && $scope.chartopt.chartStatus.status){
                    $rootScope.$broadcast('changeTableData',$scope.chartopt.tableInfo.data,$scope.chartopt.tableInfo.titles)
                }
                $scope.generateChart($scope.chartopt)
            }
            colors.push(colors.splice(0,1)[0])
        }
        /**
         * @ngdoc function
         * @methodOf dashboard.directive:echartContainer
         * @name changeStatus
         * @description 切换图表展现形式(详细|汇总)
         * @param {Boolean} flag 展现形式标识
         */
        $scope.changeStatus = (flag)=>{
            $timeout(()=>{
                $scope.generateChart($scope.chartopt)
                if($scope.chartopt.chartStatus.status){
                    $rootScope.$broadcast('changeTableData',$scope.chartopt.tableInfo.data,$scope.chartopt.tableInfo.titles)
                }else{
                    $rootScope.$broadcast('changeTableData',ctrl.$viewValue.data,$scope.$parent.otableTitles)
                }
            })
        }
    }
  }

}]