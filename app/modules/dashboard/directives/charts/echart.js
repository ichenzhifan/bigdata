'use strict';
module.exports = ['EchartTheme','$timeout',
(EchartTheme,$timeout) => {
  return{
    restrict: 'E',
    replace: true,
    templateUrl: 'modules/dashboard/views/charts/echart.html',
    link: ($scope, el, attrs, ctrl) => {
        var mychart,tarEl = el[0].firstElementChild,cacheOption
        // var mychart = echarts.init(el[0],EchartTheme)
        /**
         * @ngdoc function
         * @methodOf dashboard.directive:echart
         * @name generateChart
         * @description 生成图表
         * @param {Object} chartopt 图表配置信息
         */
        $scope.generateChart = (chartopt)=>{
            mychart && mychart.dispose()
            mychart = echarts.init(tarEl,EchartTheme)
            if(chartopt){
                if(chartopt.chartStatus && chartopt.chartStatus.status){
                    cacheOption = chartopt.ooption
                    mychart.setOption(chartopt.ooption)
                }else{
                    cacheOption = chartopt.option
                    mychart.setOption(chartopt.option)
                }
            }
            // $scope.chartopt.option && (mychart.setOption($scope.chartopt.option))
        }
        /**
         * @ngdoc function
         * @methodOf dashboard.directive:echart
         * @name refresh
         * @description 刷新图表
         * @param {Object} opt 图表配置信息
         * @param {Boolean} flag 是否覆盖原来的配置
         */
        $scope.toggleClz = 'fa-toggle-off'
        $scope.toggelLegend = ()=>{
            let equalOff = $scope.toggleClz === 'fa-toggle-off'
            $scope.toggleClz = $scope.toggleClz === 'fa-toggle-off' ? 'fa-toggle-on' : 'fa-toggle-off'
            if(mychart){
                let legend = cacheOption.legend
                legend.selected = {}
                legend.data.forEach((item)=>{
                    legend.selected[item] = !equalOff
                })
                mychart.setOption(cacheOption,true) 
            }
        }
        $scope.refresh = (opt,flag)=>{
            if(!opt) return 
            if(!mychart){
                mychart = echarts.init(tarEl,EchartTheme)
            }
            cacheOption = opt
            mychart.setOption(opt,true)
        }

        /**
         * @ngdoc function
         * @methodOf dashboard.directive:echart
         * @name reload
         * @description 重新绘制图表，配合checkbox-select使用
         * @param {Object} opt 图表配置信息
         * @param {Array} colors  颜色数组
         */
        $scope.reload = (opt,colors)=>{
            var prevOption = mychart.getOption()
            cacheOption = {
                title:prevOption.title,
                tooltip: prevOption.tooltip,
                toolbox:prevOption.toolbox,
                color:colors,
                series:opt.series,
                legend:{
                    top:25,
                    data:opt.legend
                },
                xAxis:prevOption.xAxis,
                yAxis: prevOption.yAxis
            }
            mychart.setOption(cacheOption,true)
        }
       
        // console.log($scope.chartopt)
        // 使用刚指定的配置项和数据显示图表。
        // loadData()
        // $scope.$watch('chartopt',(newVal,oldVal)=>{
        //     if((newVal === oldVal) && loaded) return 
        //     loadData(newVal,$scope.generalData)
        // })
        // $scope.$watch('generalData',(newVal,oldVal)=>{
        //     // debugger
        //     if(newVal === oldVal) return
        //     loadData($scope.chartopt,newVal)
        // })
	    // $scope.$on('reload',($event,data)=>{
     //        loadData()
     //    })

        // $scope.$on('changeZhibiao',($event,obj)=>{
        //     isShow = false
        //     if(obj.id == $scope.config.id){
        //         isShow = true
        //         mychart.resize()
        //     }
        // })

        $scope.$on('resize',($event,obj)=>{
            $timeout(()=>{
                $timeout(()=>{
                    mychart && mychart.resize()
                },300)
            })
        })

        $scope.$on('$destroy',()=>{
            mychart && mychart.dispose()
            mychart = null
        })
    }
  }

}]