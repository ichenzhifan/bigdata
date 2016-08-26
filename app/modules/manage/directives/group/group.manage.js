'use strict';
module.exports = ['$rootScope','groupManageService','$timeout','$compile','groupResourceService',
($rootScope,groupManageService,$timeout,$compile,groupResourceService) => {
  return{
    restrict: 'E',
    replace: true,
    templateUrl: 'modules/manage/views/group/group.manage.html',
    link:(scope, el, attrs) => {
 		scope.tableData = {
	        data:[],
	        titles:[
	            {title:'群组ID'},
	            {title:'群组名称'},
	            {title:'群组描述'}, 
	            {title:'操作'} 
	        ],
	        oprs:[
	            {text:'编辑',clz:'btn-primary btn-sm',fun:'edit'},
	            // {text:'删除',clz:'btn-danger btn-sm',fun:'del'},
	            {text:'权限分配',clz:'btn-primary btn-sm',fun:'authority'}
	        ]
	    } 
        groupResourceService.getAllGroups().then((resp)=>{
            tableObj.oTable && (tableObj.oTable.fnDestroy(),tableObj.oTable = null)
            scope.tableData.data = resp.data
        })

	    scope.tableOperation = (opr,data)=>{
	        groupManageService[opr](data,scope.tableData.data,tableObj) 
	    }

	    var tableObj = {oTable:null},$tableEl = el.find('table'),option = {
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
            tableObj.oTable && tableObj.oTable.fnDestroy()  
            tableObj.oTable = null 
            destroyWatch() 
        })

        var generateTable = ()=>{
        	$timeout(()=>{
	        	tableObj.oTable = $tableEl.dataTable(option) 
	            el.find('.insertopr').html($compile('<button class="btn btn-primary btn-sm" ng-click="tableOperation(\'add\')"><span class="glyphicon glyphicon-plus"></span>新增群组</button>')(scope))
        	})
        }
        var destroyWatch = scope.$watchCollection('tableData.data',(newVal,oldVal)=>{
            if(newVal === oldVal){return}
            generateTable()
        })
    }
    
  }

}]