'use strict';
module.exports = [
() => {
  return{
    restrict: 'E',
    replace: true,
    scope:{
        getData:'&',
        selectId:'@',
        selectItem:'=',
        loadData:'&'
    },
    templateUrl: 'modules/commons/views/whaley.select.html',
    link:(scope, el, attrs,ngModelCtrl) => {
        var tmpData = scope.getData()
        if(!tmpData){
            scope.data = [{
                name:'50条',
                value:50
              },{
                name:'100条', 
                value:100
              },{
                name:'150条',
                value:150
              },{
                name:'200条',
                value:200
              }]
        }else{
            scope.data = tmpData
        }
        if(!scope.selectItem){
            scope.selectItem =  scope.data[0] 
            // scope.loadData()
        }
        scope.choose = ($event,ele)=>{
            scope.selectItem = ele
            scope.loadData({value:ele.value})
        }
        scope.$on('$destroy',()=>{
            // watchParent()
        })
    }
    
    
  }

}]