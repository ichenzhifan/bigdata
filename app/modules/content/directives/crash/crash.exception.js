'use strict';
module.exports = ['crashService','$timeout','crashResource','$rootScope',
(crashService,$timeout,crashResource,$rootScope) => {
  return{
    restrict: 'E',
    replace: true,
    templateUrl: 'modules/content/views/crash/crash.exception.html',
    link: ($scope, el, attrs, ctrl) => {
      $scope.types = [
        {
          type:'firstAppear',
          name:'首次异常',
          oprs:[
              {text:'查看详情',clz:'btn-primary btn-sm',fun:'info'},
              {text:'标记解决',clz:'btn-danger btn-sm',fun:'solve'}
          ],
          titles:[
            {title:'异常ID'},
            {title:'异常名称'},
            {title:'Crash次数'},
            {title:'第一次出现时间'},
            {title:'操作'}
          ]
        },{
          type:'resolved',
          name:'已解决异常', 
          oprs:[
              {text:'查看历史',clz:'btn-primary btn-sm',fun:'history'},
              {text:'查看详情',clz:'btn-primary btn-sm',fun:'info'}
          ],
          titles:[
            {title:'异常ID'},
            {title:'异常名称'},
            {title:'Crash次数'},
            {title:'第一次出现时间'},
            {title:'操作'}
          ]
        },{
          type:'reappear',
          name:'重现异常',
          oprs:[
              {text:'查看历史',clz:'btn-primary btn-sm',fun:'history'},
              {text:'查看详情',clz:'btn-primary btn-sm',fun:'info'},
              {text:'标记解决',clz:'btn-danger btn-sm',fun:'solve'}
          ],
          titles:[
            {title:'异常ID'},
            {title:'异常名称'},
            {title:'Crash次数'},
            {title:'第一次出现时间'},
            {title:'操作'}
          ]
        }
      ]
      $scope.isLoading = false
      $scope.curType = $scope.types[0]
      $scope.tableData = {
        data:[],
        titles:$scope.curType.titles
      }
      $scope.datepicker = {
        noload:1,
        startDay:1
      }

      $scope.loadData = (limit)=>{
        if(!limit) limit = $scope.pageLength.value
        $scope.isLoading = true
        let startDate,endDate
        if($scope.datepicker.dt){
          let arr = $scope.datepicker.dt.split(' ~ ')
          startDate = arr[0]
          endDate = arr[1]
        }
        console.log('startDate :',startDate)
        console.log('endDate :',endDate)
        crashResource.getCrashList({
          param:{
            crashType:$scope.curType.type,
            version_min:$scope.version_option.min.value,
            version_max:$scope.version_option.max.value,
            crash_num_min:$scope.crash_option.low+'',
            crash_num_max:$scope.crash_option.high+'',
            limit_num:limit+'',
            startDate:startDate,
            endDate:endDate
          }
        },$scope.curType).then((data)=>{
          $scope.tableData = data
        }).finally(()=>{
          $scope.isLoading = false
        })
      }
      crashResource.getCrashParam().then((resp)=>{
        $scope.crash_option = resp.crash_option
        $scope.version_option = resp.version_option
        $scope.loadData()
      })
      $scope.operation = (opr,index)=>{
        crashService[opr]($scope.tableData.data[index],$scope.curType)
      }


      // $scope.crash_option = {
      //   low:0,
      //   high:30,
      //   min:0,
      //   max:100
      // }

      // var version_data = [{
      //     name:'版本1.0',
      //     value:1
      //   },{
      //     name:'版本2.0',
      //     value:2
      //   },{
      //     name:'版本3.0',
      //     value:3
      //   },{
      //     name:'版本4.0',
      //     value:4
      //   },{
      //     name:'版本5.0',
      //     value:5
      //   },{
      //     name:'版本6.0',
      //     value:6
      //   },{
      //     name:'版本7.0',
      //     value:7
      //   },{
      //     name:'版本8.0',
      //     value:8
      //   },{
      //     name:'版本9.0',
      //     value:9
      //   }]

      // $scope.version_option = {
      //   min:version_data[3],
      //   max:version_data[6],
      //   data:version_data
      // }

      $scope.chooseMaxVersion = ($event,ele)=>{
        $scope.version_option.max = ele
      }

      $scope.chooseMinVersion = ($event,ele)=>{
        $scope.version_option.min = ele
      }
      $scope.preventDismiss = ($event)=>{
        $event.preventDefault()
        $event.stopPropagation()
      }


      $scope.inputMin = ()=>{
        if($scope.crash_option.low < $scope.crash_option.min){
          $scope.crash_option.low = $scope.crash_option.min
        }else if($scope.crash_option.low > $scope.crash_option.max){
          $scope.crash_option.low = $scope.crash_option.max
        }
      }



      $scope.currencyFormatting = (value)=>{
        console.log('here')
        return value.toString()+'crash次数'
      }

      $scope.activeIndex = 0
      $scope.select = ($event,index,type)=>{
        $scope.activeIndex = index
        $scope.curType = type
        $scope.loadData()
        $event.preventDefault()
        $event.stopPropagation()
      }
      $scope.$on('$destroy',()=>{
      })
    }
  }

}]