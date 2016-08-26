'use strict';
module.exports = ['$rootScope',
'$timeout','Notification','$compile',
($rootScope,
    $timeout,Notification,$compile) => {
  return{
    restrict: 'E',
    replace: true,
    require:'?ngModel',
    scope:{
        pageLength:'=',
        loadData:'&',
        operation : '&'

    },
    templateUrl: 'modules/content/views/crash/crash.table.html',
    link:(scope, el, attrs,ctrl) => {
        var oTable,$table,$tar = el.find('.crashTableContainer')
	    // scope.tableOperation = (opr,data)=>{
	    //     scope.operation({
     //            opr:opr,
     //            data:data
     //        })
	    // }

        scope.loadTableData = (value)=>{
            scope.loadData({
                value:value
            })
        }
        ctrl.$render = ()=>{
            console.log('render')
            if(!ctrl.$viewValue) return
            oTable && oTable.fnDestroy()
            $table && ($table.remove())
            $tar.html('<table cellspacing="0" width="100%" class="table table-striped table-bordered crash-table"></table>')
            // var oprs = ctrl.$viewValue.oprs
            // ,content = '<div class="opr-group">'
            // console.log('ctrl.$viewValue :',ctrl.$viewValue)
            // oprs.forEach((opr)=>{
            //     content += `<button class="btn btn-flat ${opr.clz}" >${opr.text}</button>`
            // })
            // content += '</div>'
            // ctrl.$viewValue.data.forEach((d)=>{
            //     d.push($compile(content)(scope))
            // })
            console.log('in datatable length :',ctrl.$viewValue.data.length)
            $table = $tar.find('table') 
            oTable =  $table.dataTable({
                data:ctrl.$viewValue.data,
                columns:ctrl.$viewValue.titles,
                dom: "<'row'<'col-md-6'><'col-md-6'<'tableopr insertopr'><'ta bleopr'Tf>>>" +
    "<'row'<'col-md-12'tr>>" +
    "<'row'<'col-md-5'i><'col-md-7'p>>",
                tableTools: { 
                    "aButtons": [
                        {
                            "sExtends": "copy",
                            "sButtonText": "copy"
                        },
                        {
                            "sExtends": "xls",
                            "sButtonText": "excel"
                        } 
                    ]
                    // "sSwfPath": "https://www.datatables.net/release-datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf"
                },
                oLanguage:{
                    sZeroRecords:'没有找到符合条件的数据',
                    sInfo: "当前第 _START_ - _END_ 条　共计 _TOTAL_ 条",  
                    sSearch: "搜索："
                },
                paging:false
            })
            $table.find('button').bind('click',(event)=>{
                var $btn= $(event.target)
                scope.$apply(()=>{
                    scope.operation({
                        opr:$btn.attr('opr'),
                        data:$btn.attr('rowindex')
                    })
                })
            })
        }

        // generateTable()
        scope.$on('$destroy',()=>{
            oTable && oTable.fnDestroy()
            oTable = null
        })
    }
    
  }

}]