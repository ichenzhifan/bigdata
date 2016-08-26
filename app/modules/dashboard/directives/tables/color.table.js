'use strict';
module.exports = ['$timeout','dataParserService','$compile',
($timeout,dataParserService,$compile) => {
  return{
    restrict: 'E',
    replace: true,
    require:'?ngModel',
    templateUrl: 'modules/dashboard/views/tables/color.table.html',
    link: ($scope, el, attrs, ctrl) => {
        if(!ctrl) return
        var $tar = el.find('tbody')   
        ,generateTable = (data)=>{
            console.log('data :',data)
            if(!data) return
            var str = "",tmp,clz
            data.forEach((row,rowi)=>{
                str += '<tr>'
                row.forEach((col,coli)=>{
                    if(coli > 1 && col){
                        tmp = _.round(100 *col,2)
                        clz = 'td-color-'+Math.floor(tmp/10) 
                        str += '<td class="'+clz+'">'+tmp+'%</td>' 
                    }else{
                       str += '<td>'+col+'</td>' 
                    }
                    
                })
                str += '</tr>'
            })
            return str
        }


        ctrl.$render = ()=>{
            if(!ctrl.$viewValue) return
            $tar.html(generateTable(ctrl.$viewValue.data))
        }  
       
    }
  }

}]