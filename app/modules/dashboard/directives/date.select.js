'use strict';
module.exports = ['$timeout','reqDataService',
($timeout,reqDataService) => {
  return{
    restrict: 'E',
    replace: true,
    scope:{
      fmt:'@',
      sid:'@',
      paramName:'@',
      config:'='
      // loadContentdata:'&'
    },
    templateUrl: 'modules/dashboard/views/date.select.html',
    link: (scope, el, attrs, ctrl) => {

      var loadData =  (param)=>{
        reqDataService.reqGeneralData(param).then((data)=>{
          $scope.generalData = data
        }).finally(()=>{
        })
      }


      scope.fmt || (scope.fmt = 'YYYY-MM-DD')
      // scope.config[scope.paramName] = scope.config[scope.paramName] || []
      scope.localParam = Object.assign({},scope.config)
      scope.data = scope.data || []
      scope.confirm = ($event)=>{
        // console.log('activeDate :',scope.activeDate)
        // console.log('mulselect11 :',scope.data ) 
        scope.config[scope.paramName] = scope.data
        loadData(scope.localParam)
      }
      scope.$on('changeOptionList',(event,data,flag)=>{
          scope.originData = data
          if(flag){
            // loadData(scope.localParam)
          }
      })


      scope.preventDismiss = ($event)=>{
        $event.preventDefault()
        $event.stopPropagation()
      }
      
      scope.$on('$destroy',()=>{
      })

      // if(!scope.noLoad || scope.noLoad == '0'){
      //   $timeout(()=>{
      //     scope.loadContentdata()
      //   })
      // }
    }
  }

}]