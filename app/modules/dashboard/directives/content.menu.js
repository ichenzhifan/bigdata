'use strict';
module.exports = ['$rootScope','MemoryCache','Memorykey','MobileService','dashboardService',
($rootScope,MemoryCache,Memorykey,MobileService,dashboardService) => {
  return{
    restrict: 'E',
    replace: true,
    // scope:{
    // },
    templateUrl: 'modules/dashboard/views/content.menu.html',
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

        scope.applist = MemoryCache.get(Memorykey.APPS_KEY)
        scope.chooseApp = ($event,app)=>{
          $rootScope.$broadcast('changeText',"whaley-"+app)
          var curApp = {name:app}
          $rootScope.$broadcast('changeCurApp',curApp)
          dashboardService.changeApp(curApp)
          dashboardService.loadMenus()
        }
        // scope.flgs = {
        //   showflg : true,
        //   spinned : true
        // }
        scope.searchMenu = '' 
        var watchSearch = scope.$watch('searchMenu',(newVal,oldVal)=>{
          if(newVal === oldVal) return
          scope.menutree = menuFilter(scope.allmenus.menus,newVal)
        })
        scope.$on('changeMenus',(event,cache)=>{
          scope.menutree = menuFilter(cache.menus,scope.searchMenu)
        })
        dashboardService.loadMenus()
        // var watchMenus = scope.$watch('allmenus.menus',(newVal,oldVal)=>{
        //   if(newVal === oldVal) return
        //   scope.menutree = menuFilter(newVal,scope.searchMenu)
        // })
        // var $window = $(window),$content = el.siblings('.content-bg').children('.main-content')
        // console.log('height :',$content.height())
        // $window.scroll((e)=>{
        //   console.log('height :',$content.height()-document.documentElement.clientHeight)
        //   if(window.scrollY > $content.height()-document.documentElement.clientHeight){
        //     console.log('prevent')
        //     e.preventDefault()
        //     return
        //   }
        //   el.css('transform','translateY('+window.scrollY+'px)')
        // })
        // $('body').scrollTop($tarEl.offset().top-106){
        //       window.scrollTo(0,$tarEl.offset().top-106)
        scope.sortApp = ($event,app,index)=>{
          $event.preventDefault()
          $event.stopPropagation()
          console.log('sort App')
        }
        scope.$on('$destroy',()=>{
          watchSearch()
          dashboardService.emptyCache()
          // watchMenus()
        })



        // var isSpined = ()=>{
        //   return scope.flgs.spinned
        // }

        // scope.hide = ()=>{
        //   if(isSpined()) return
        //   scope.flgs.showflg = false
        // }
        // scope.show = ()=>{
        //   if(isSpined()) return
        //   scope.flgs.showflg = true 
        // }
        // scope.spin = ()=>{
        //   scope.flgs.spinned = !scope.flgs.spinned
        //   // $rootScope.$broadcast('resize')
        // }



      }
    }
    
  }

}]