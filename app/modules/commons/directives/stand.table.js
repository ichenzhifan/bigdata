'use strict';
module.exports = ['$rootScope','$timeout','$compile',
($rootScope,$timeout,$compile) => {
  return{
    restrict: 'EA',
    replace: true,
    scope:{
        tableData:'=',
        tableOperation:'&',
        templateName:'@',
        unvisibleCol:'@' 
    },
    templateUrl: 'modules/commons/views/stand.table.html',
    link:(scope, el, attrs,ngModelCtrl) => {
        var oTable,$tableEl = el.find('table'),option = {
            dom: "<'row'<'col-md-6'l><'col-md-6'<'tableopr insertopr'><'tableopr'f>>>" +
    "<'row'<'col-md-12'tr>>" +
    "<'row'<'col-md-5'i><'col-md-7'p>>",
            oLanguage:{
                sZeroRecords:'没有找到符合条件的数据',
                sInfo: "当前第 _START_ - _END_ 条　共计 _TOTAL_ 条",  
                sLengthMenu: "每页显示 _MENU_条", 
                oPaginate: {  
                    sFirst: "首页",  
                    sPrevious: "前一页",  
                    sNext: "后一页",  
                    sLast: "尾页"  
                } ,
                sSearch: "搜索："
            }
        }
        scope.$on('$destroy',()=>{
            oTable && oTable.fnDestroy() 
            oTable = null 
        })
        scope.operation = (opr,data)=>{
            scope.tableOperation({
                opr:opr,
                data:data
            })
        }

        if(scope.unvisibleCol){
            option.columnDefs = [
                {"visible":false,"targets":JSON.parse(scope.unvisibleCol)}
            ]
        }
        scope.$watch('tableData',(newVal,oldVal)=>{
            if(newVal === oldVal){return}
            $timeout(()=>{
                oTable && oTable.fnDestroy()
                oTable = $tableEl.dataTable(option) 
            })
        })
        if(scope.tableData){
            $timeout(()=>{
                oTable = el.dataTable(option) 
            })
        }

    }
    
  }

}]