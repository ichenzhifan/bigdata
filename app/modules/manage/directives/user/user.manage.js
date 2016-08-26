'use strict';
module.exports = ['$rootScope','userMock','userManageService',
'$timeout','$compile','userResourceService','Notification','MemoryCache','Memorykey',
($rootScope,userMock,userManageService,
    $timeout,$compile,userResourceService,Notification,MemoryCache,Memorykey) => {
  return{
    restrict: 'E',
    replace: true,
    templateUrl: 'modules/manage/views/user/user.manage.html',
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
        scope.appIsNotNull = !!MemoryCache.get(Memorykey.CUR_APP_KEY).name
        userResourceService.getAllGroups().then((map)=>{
            scope.groupMap = map
            return userResourceService.getAllUsers()
        }).then((resp)=>{
            tableObj.oTable && (tableObj.oTable.fnDestroy(),tableObj.oTable = null)
            scope.tableData.data = resp.data
        })

	    scope.tableOperation = (opr,data)=>{
	        userManageService[opr](data,scope.tableData.data,tableObj)
	    }

	    var tableObj = {oTable:null},$tableEl = el.find('table'),option = {
            dom: "<'row'<'col-md-6'l><'col-md-6'<'tableopr insertopr'><'ta bleopr'f>>>" +
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

        var generateTable = ()=>{ 
        	$timeout(()=>{
                tableObj.oTable = $tableEl.dataTable(option)  
	            el.find('.insertopr').html($compile('<button class="btn btn-primary btn-sm" ng-click="tableOperation(\'add\')"><span class="glyphicon glyphicon-plus"></span>新增用户</button>')(scope))
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