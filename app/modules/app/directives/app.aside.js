'use strict';
module.exports = ['$rootScope','MobileService',
($rootScope,MobileService) => {
  return{
    restrict: 'E',
    replace: true,
    // scope:{
    // },
    templateUrl: 'modules/app/views/app.aside.html',
    compile:(tEl, tAttrs)=>{


      return  (scope, el, attrs, ctrl) => {


        // ,$window = $(window)
        // ,$document = $(document)
        var menuFilter = (input,searchMenu) => {
          if(!searchMenu || searchMenu == ''){
            return input
          }
          var ret = [],diguiFlg = (obj)=>{
            var flg = false;
            obj.forEach((o)=>{
              o.meflg = false
              o.ndsflg = false
              if(o.title.indexOf(searchMenu) >= 0){
                o.meflg  = true
                flg = true
              }else if(o.nodes){
                o.ndsflg = diguiFlg(o.nodes)
                o.ndsflg && (flg = true)
              }
            })
            return flg
          },diguiVal = (obj) =>{
            var arr = [],tmp
            obj.forEach((o)=>{
              if(o.meflg){
                tmp = cloneObj(o)
                tmp.nodes = o.nodes
              }else if(o.ndsflg){
                tmp = cloneObj(o)
                tmp.nodes = diguiVal(o.nodes)
              }else{
                tmp = null
              }
              tmp && (arr.push(tmp))
            })
            return arr
          },cloneObj = (obj)=>{
            var retObj = {}
            for(var attr in obj){
              if(attr != 'nodes'){
                retObj[attr] = obj[attr]
              }
            }
            return retObj
          }

          diguiFlg(input)
          return diguiVal(input)

        }




        scope.searchMenu = ''
        var watchSearch = scope.$watch('searchMenu',(newVal,oldVal)=>{
          if(newVal === oldVal) return
          scope.menutree = menuFilter(scope.allmenus.menus,newVal)
        })



        scope.$on('$destroy',()=>{
          watchSearch()
        })




      }
    }
    
  }

}]