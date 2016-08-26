'use strict';
module.exports = ['$timeout','dataParserService',
($timeout,dataParserService) => {
  return{
    restrict: 'E',
    replace: true,
    require:'?ngModel',
    templateUrl: 'modules/dashboard/views/tables/datatable.html',
    link: ($scope, el, attrs, ctrl) => {
        if(!ctrl) return
        var oTable,$table
        // $scope.loadTable = (data)=>{
        //     oTable =  el.dataTable({
        //         data:data.data,
        //         dom: "<'row'<'col-md-6'l><'col-md-6'Tf>>" +
        // "<'row'<'col-md-12'tr>>" +
        // "<'row'<'col-md-5'i><'col-md-7'p>>",
        //         tableTools: { 
        //             "aButtons": [
        //                 {
        //                     "sExtends": "copy",
        //                     "sButtonText": "copy"
        //                 },
        //                 {
        //                     "sExtends": "xls",
        //                     "sButtonText": "excel"
        //                 } 
        //             ],
        //             "sSwfPath": "http://datatables.net/release-datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf"
        //         },
        //     })
        // }
        ctrl.renderTable = (data,titles)=>{
            oTable && oTable.fnDestroy()
            $table && ($table.remove())
            el.html('<table cellspacing="0" width="100%" class="table table-striped table-bordered"></table>')

            $table = el.find('table') 
            oTable =  $table.dataTable({
                data:data,
                columns:dataParserService.array2titles(titles),
                dom: "<'row'<'col-md-6'l><'col-md-6'Tf>>" +
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
                    sLengthMenu: "每页显示 _MENU_条", 
                    oPaginate: {  
                        sFirst: "首页",  
                        sPrevious: "前一页",  
                        sNext: "后一页",  
                        sLast: "尾页"  
                    } ,
                    sSearch: "搜索："
                }
            })
        }

        ctrl.$render = ()=>{
            if(!ctrl.$viewValue) return
            ctrl.renderTable(ctrl.$viewValue.data,$scope.tableTitles)
        //     oTable && oTable.fnDestroy()
        //     $table && ($table.remove())
        //     el.html('<table cellspacing="0" width="100%" class="table table-striped table-bordered"></table>')

        //     $table = el.find('table') 
        //     oTable =  $table.dataTable({
        //         data:ctrl.$viewValue.data,
        //         columns:dataParserService.array2titles($scope.tableTitles),
        //         dom: "<'row'<'col-md-6'l><'col-md-6'Tf>>" +
        // "<'row'<'col-md-12'tr>>" +
        // "<'row'<'col-md-5'i><'col-md-7'p>>",
        //         tableTools: { 
        //             "aButtons": [
        //                 {
        //                     "sExtends": "copy",
        //                     "sButtonText": "copy"
        //                 },
        //                 {
        //                     "sExtends": "xls",
        //                     "sButtonText": "excel"
        //                 } 
        //             ]
        //             // "sSwfPath": "https://www.datatables.net/release-datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf"
        //         },
        //         oLanguage:{
        //             sZeroRecords:'没有找到符合条件的数据',
        //             sInfo: "当前第 _START_ - _END_ 条　共计 _TOTAL_ 条",  
        //             sLengthMenu: "每页显示 _MENU_条", 
        //             oPaginate: {  
        //                 sFirst: "首页",  
        //                 sPrevious: "前一页",  
        //                 sNext: "后一页",  
        //                 sLast: "尾页"  
        //             } ,
        //             sSearch: "搜索："
        //         }
        //     })
        }

        $scope.$on('changeTableData',($event,data,titles)=>{
            $timeout(()=>{
                $scope.tableTitles = titles
                console.log('data :',data)
                ctrl.renderTable(data,titles)
            })
        })
        // $scope.$watch('generalData',(newVal,oldVal)=>{
        //     if(newVal === oldVal) return 
        //     generateTable(newVal.data)
        // })
        // var $tar = el.parents('.table-wrapper')
        // $tar.on('mousedown',()=>{
        //     console.log('mousedown')
        // })

        // $tar.on('click',()=>{
        //     console.log('click')
        // })
        $scope.$on('$destroy',()=>{
            oTable && oTable.fnDestroy()
            oTable = null
        })
       
    }
  }

}]