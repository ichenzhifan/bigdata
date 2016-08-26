'use strict';
module.exports = ['$timeout',
($timeout) => {
  return{
    restrict: 'E',
    replace: true,
    scope:{
        data:'=',
        config:'=',
        loadContentdata:'&'
    },
    templateUrl: 'modules/commons/views/filter.group.html',
    link:(scope, el, attrs,ngModelCtrl) => {
        var generalList = (data)=>{
            var pid,arr = [{id:'NAN',value:''}]
            data.forEach((d)=>{
                if(!pid){
                    arr.push(d.list[0])
                    pid = d.list[0].id
                }else{
                    d.list.forEach((dele)=>{
                        if(dele.pid == pid){
                            arr.push(dele)
                            pid = dele.id
                            return false
                        }
                    })
                }
            })
            return arr
        },getParam = (list)=>{
            var str = ''
            for(var i = 1; i < scope.selectList.length; i++){
                str += scope.selectList[i].value
                if(i < scope.selectList.length -1){
                    str += '-'
                }
            }
            return str
        }
        scope.selectList = generalList(scope.data.data)
        scope.config[scope.data.param] = getParam(scope.selectList)
        if(scope.data.enableUri && scope.selectList.length > 0){
            scope.config.chartval = {
                sqlUri:scope.selectList[1].uri
            }
        }
        scope.loadData = (index)=>{
            if(index == scope.data.data.length-1){
                $timeout(()=>{
                    // console.log('param :',getParam(scope.selectList))
                    scope.config[scope.data.param] = getParam(scope.selectList)
                    if(scope.data.enableUri && scope.selectList.length > 0){
                        scope.config.chartval = {
                            sqlUri:scope.selectList[1].uri
                        }
                    }
                    
                    scope.loadContentdata() 
                })
                
                // scope.config[data.param] = getParam(scope.selectList)
            }
        }
    }
    
    
  }

}]