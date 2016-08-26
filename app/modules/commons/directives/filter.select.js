'use strict';
module.exports = [
() => {
  return{
    restrict: 'E',
    replace: true,
    scope:{
        data:'=',
        selectItem:'=',
        parentItem:'=',
        text:'@',
        level:'@',
        loadData:'&'
    },
    templateUrl: 'modules/commons/views/filter.select.html',
    link:(scope, el, attrs,ngModelCtrl) => {
        // scope.icons = MenuIcon
        var defaultItem = {
            id:-1,
            name:scope.text
        },optionFilter = (input,parent) => {
            var arr = []
            // console.log('parent :',parent)
            if(!parent || parent.id === -1) return arr
            if(parent.id === 'NAN'){
                return input
            }
            if(input){
                input.forEach((e)=>{
                    if(e.pid === parent.id){
                        arr.push(e)
                    }
                })
            }
            return arr
        }
        scope.optionlist = optionFilter(scope.data,scope.parentItem)
        if(!scope.selectItem){
            scope.selectItem =  scope.optionlist[0] 
        }
        scope.choose = ($event,ele)=>{
            scope.selectItem = ele
            scope.loadData({
                index:scope.level
            })
            // if(!ele){
            //    scope.selectItem = defaultItem
            // }else{
            //    scope.selectItem = ele
            //    scope.loadData({
            //         index:scope.level
            //    })
            // }
            
        }
        var watchParent = scope.$watch('parentItem',(newVal,oldVal)=>{
            if(newVal === oldVal) return 
            scope.optionlist = optionFilter(scope.data,scope.parentItem)
            scope.selectItem = scope.optionlist[0]
        })

        

        scope.$on('$destroy',()=>{
            watchParent()
        })
    }
    
    
  }

}]