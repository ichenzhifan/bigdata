'use strict';
module.exports = ['MobileService','$rootScope',
(MobileService,$rootScope) => {
  return{
    restrict: 'E',
    replace: true,
    scope:{
        selectId:'@',
        label:'@'
    },
    templateUrl: 'modules/commons/views/checkbox.select.html',
    link:(scope, el, attrs,ngModelCtrl) => {
        scope.preventDismiss = ($event)=>{
            $event.preventDefault()
            $event.stopPropagation()
            console.log('preventDismiss')
        }
        scope.optionList = []
        scope.$on('changeOptionList',(event,data)=>{
            data.forEach((item)=>{
                item.chosen = true
            })
            scope.chosenAll = true
            scope.optionList = data
        })
        scope.choose = ($event,ele)=>{
            $event.preventDefault()
            $event.stopPropagation()
            if(!ele){
                scope.chosenAll = !scope.chosenAll
                scope.optionList.forEach((item)=>{
                    item.chosen = scope.chosenAll
                })
                return 
            }
            ele.chosen = !ele.chosen
            let flag = true
            for(var i = 0 ; i < scope.optionList.length; i++){
                if(!scope.optionList[i].chosen){
                    flag = false
                    break
                }
            }
            scope.chosenAll = flag
        }
        scope.confirm = ($event)=>{
            var option = {
                series:[],
                legend:[]
            }
            scope.optionList.forEach((item)=>{
                if(item.chosen){
                    option.series.push(item)
                    option.legend.push(item.name)
                }
            })
            $rootScope.$broadcast('refreshChart',option)
        }
    }
  }

}]