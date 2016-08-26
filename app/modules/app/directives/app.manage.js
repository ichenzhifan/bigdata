'use strict';
module.exports = ['$rootScope','appManageService',
'$timeout','$compile','appResourceService','Notification',
($rootScope,appManageService,
    $timeout,$compile,appResourceService,Notification) => {
  return{
    restrict: 'E',
    replace: true,
    templateUrl: 'modules/app/views/app.list.html',
    link:(scope, el, attrs) => {
    	scope.tableData = {
            data:[]
	        // titles:[
         //        {title:'用户ID'},
	        //     {title:'用户姓名'},
	        //     {title:'登录邮箱'},
	        //     {title:'所属群组'},
	        //     {title:'是否为管理员'},
	        //     {title:'创建时间'},
	        //     {title:'操作'} 
	        // ],
	        // oprs:[
	        //     {text:'编辑',clz:'btn-primary btn-sm',fun:'edit'},
	        //     {text:'删除',clz:'btn-danger btn-sm',fun:'del'},
	        //     {text:'角色权限信息',clz:'btn-primary btn-sm',fun:'info'}
	        // ]
	    } 
        appResourceService.getAllApps().then((resp)=>{
            tableObj.oTable && (tableObj.oTable.fnDestroy(),tableObj.oTable = null)
            scope.tableData.data = resp.data
        })
	    scope.tableOperation = (opr,data)=>{
	        appManageService[opr](data,scope.tableData.data,tableObj)
	    } 

	    var tableObj = {oTable:null},$tableEl = el.find('table'),option = {
            dom: "<'row'<'col-md-6'l><'col-md-6'<'tableopr insertopr'><'ta bleopr'f>>>" +
    "<'row'<'col-md-12'tr>>" +
    "<'row'<'col-md-5'i><'col-md-7'p>>",
        }

        var generateTable = ()=>{ 
        	$timeout(()=>{
                tableObj.oTable = $tableEl.dataTable(option)  
	            el.find('.insertopr').html($compile('<button class="btn btn-primary btn-sm" ng-click="tableOperation(\'add\')"><span class="glyphicon glyphicon-plus"></span>新增应用</button>')(scope))
        	})
        }
        var destroyWatch = scope.$watchCollection('tableData.data',(newVal,oldVal)=>{
            if(newVal === oldVal){return}
            generateTable()
        })
        scope.$on('$destroy',()=>{
            destroyWatch()
            tableObj.oTable && (tableObj.oTable.fnDestroy(),tableObj.oTable = null)
        })
    }
    
  }

}]