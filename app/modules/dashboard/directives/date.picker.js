'use strict';
module.exports = ['$timeout',
($timeout) => {
  return{
    restrict: 'E',
    replace: true,
    scope:{
      type:'@',
      data:'=',
      fmt:'@',
      startDay:'@',
      noLoad:'@',
      loadContentdata:'&'
    },
    templateUrl: 'modules/dashboard/views/date.picker.html',
    link: (scope, el, attrs, ctrl) => {
      scope.fmt || (scope.fmt = 'YYYY-MM-DD')
      var $input = el.find('input'),opt = {
        'opens':'left',
         "locale": {
            "format": scope.fmt,
            "separator": " ~ ",
            "applyLabel": "确认",
            "cancelLabel": "取消",
            "fromLabel": "From",
            "toLabel": "To",
            "customRangeLabel": "自定义",
            "daysOfWeek": [
                "Su",
                "Mo",
                "Tu",
                "We",
                "Th",
                "Fr",
                "Sa"
            ],
            "monthNames": [
                "一月",
                "二月",
                "三月",
                "四月",
                "五月",
                "六月",
                "七月",
                "八月",
                "九月",
                "十月",
                "十一月",
                "十二月"
            ]
        }
      }
      if(scope.type == 'single'){
        opt.singleDatePicker = true
        opt.startDate = opt.endDate = moment().subtract(1, 'days')
      }else{ // if(scope.type == 'custom')
        let yester = moment().subtract(1, 'days')
        opt.ranges = {
           // '今天': [moment(), moment()],
           '昨天': [yester, yester],
           '最近七天': [moment().subtract(7, 'days'), yester],
           '最近30天': [moment().subtract(30, 'days'), yester],
           '这个月': [moment().startOf('month'), moment().endOf('month')],
           '上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
        if(!scope.startDay && scope.startDay !== 0){
          console.log('here1')
          opt.startDate = moment().subtract(7, 'days')
        }else{
          console.log('here2')
          opt.startDate = moment().subtract(scope.startDay, 'days')
        }
        opt.endDate = yester
      }
      
      $input.daterangepicker(opt)
      .on('apply.daterangepicker', function(ev, picker) {
        scope.$apply(()=>{
          scope.loadContentdata()
        })
          // console.log('data changed :',scope.data)
          // console.log(picker.startDate.format(scope.fmt) + ' - ' + picker.endDate.format(scope.fmt));
      });
      scope.$on('$destroy',()=>{
        $input.daterangepicker()
      })

      if(!scope.noLoad || scope.noLoad == '0'){
        $timeout(()=>{
          scope.loadContentdata()
        })
      }
    }
  }

}]