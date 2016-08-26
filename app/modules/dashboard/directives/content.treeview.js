'use strict';
module.exports = ['$rootScope','$compile','$state','Notification', 
($rootScope,$compile,$state,Notification) => {
  return{
    restrict: 'E',
    replace: true,
    require:'?ngModel',
    // scope:{
    // },
    templateUrl: 'modules/dashboard/views/tree.view.html',
    compile:(tEl, tAttrs)=>{
      return  (scope, el, attrs, ngModelCtrl) => {
        if(!ngModelCtrl) return
        var generateMenuTree = (data,level,name,rootPath,childPath)=>{
          if(!data || data.length == 0 || !name) return ''
          var content = '',tmpName,isRoot = false
          if(level == 0){
            isRoot = true
            content += '<ul>'
          }else{
            content += '<ul class="submenu">'
          }
          data.forEach((d,i)=>{
            if(isRoot){
              rootPath.text = d.title
              rootPath.iconClz = d.icon
            }else{
              childPath.push(d.title)
            }
            tmpName = name + '['+i+']'
            if(d.nodes && d.nodes.length > 0){ 
              content += '<li id="'+d.popedom_id+'"><a href="javascripts:(void)0;">'
            }else{
              d.rootPath = {
                text:rootPath.text,
                iconClz:rootPath.iconClz
              }
              d.childPath = childPath.slice(); 
              content += '<li id="'+d.popedom_id+'" ng-click="clickMenu($event,'+tmpName+')"><a href="javascripts:(void)0;">'
            }
            
            if(d.icon){
              content += '<i class="fa '+d.icon+'"></i><span class="menuname">'+d.title+'</span></a>'
            }else{
              content += '<i class="fa fa-circle-o"></i><span class="menuname">'+d.title+'</span></a>'
            }
            if(d.nodes){
              content += generateMenuTree(d.nodes,level+1,tmpName+'.nodes',rootPath,childPath)
            }
            content += '</li>'
            childPath.pop(d.title)
          })
          content += '</ul>'
          return content
        }
        ngModelCtrl.$render = ()=>{
          el.html(
            $compile(
              generateMenuTree(ngModelCtrl.$viewValue,0,'menutree',{},[])
            )(scope)
          ).jqueryAccordionMenu()
        }
        var getTree = ()=>{
          return menuMock
        }

        /**
         * @ngdoc function
         * @methodOf dashboard.directive:contentTreeview
         * @name clickMenu
         * @description 单击菜单触发的回调,加载该菜单的数据图表
         * @param {Object} $event 事件
         * @param {Object} data 菜单配置信息
         */
        scope.clickMenu = ($event,data)=>{
          if(!data.toJsonFlg){
            try{
              data.config = JSON.parse(data.config)
            }catch(e){
              Notification.error('配置信息无法解析成JSON')
            }
            data.toJsonFlg = true
          }
          // $rootScope.$broadcast('scrollTop')
          // setTimeout(()=>{
          console.log('data =========>',data)
          $rootScope.$broadcast('scroll-reborn')
          // },500)
          
          scope.allmenus.config = data
          // data.url && $state.go(data.url,{param:{
          //   config:data
          // }})
        }


        
        
        // $tarUl.find('li').click(()=>{

        // })

        // el.find('.menutree').treeview({
        //   data:getTree(),
        //   selectedBackColor:'rgba(0,0,0,0.3)',
        //   onhoverColor:'rgba(0,0,0,0.2)',
        //   backColor:'#2D3556'

        // })
        // .on('nodeSelected', function(event, data) {
        //   if(!data.childs){
        //     event.preventDefault()
        //     event.stopPropagation()
        //     return
        //   }
        //   $rootScope.$broadcast('openmenu',data)
        // });


      }
    }
    
  }

}]