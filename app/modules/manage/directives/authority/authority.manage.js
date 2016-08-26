'use strict';
module.exports = ['$rootScope','menuMock','authorityManageService','utilManageService','authorityResourceService','LoadingService',
($rootScope,menuMock,authorityManageService,utilManageService,authorityResourceService,LoadingService) => {
  return{
    restrict: 'E',
    replace: true,
    templateUrl: 'modules/manage/views/authority/authority.manage.html',
    link:(scope, el, attrs) => {
 		// scope.authorityData = utilManageService.relationTree(menuMock)
        scope.oprs = [
            {btnclz:'primary',clz:'fa-plus',fun:'add',tip:'新建子菜单'},
            {btnclz:'primary',clz:'fa-edit',fun:'edit',tip:'编辑菜单'},
            // {btnclz:'danger',clz:'fa-times',fun:'del',tip:'删除菜单'},
            {btnclz:'warning',clz:'fa-users',fun:'group',tip:'指派群组'},
            {btnclz:'warning',clz:'fa-user',fun:'user',tip:'指派用户'},
            
        ]

        scope.rootOprs = [
            {btnclz:'primary tree-spec-opr',clz:'fa-plus',fun:'add',tip:'新建子菜单'}
        ]
        scope.authorityOperation = (opr,node)=>{
            authorityManageService[opr](node)
        }
        authorityResourceService.getAllGroups().then(()=>{
            authorityResourceService.getAllAuthority().then((resp)=>{
                // console.log('data :',resp.data)
                scope.authorityData = utilManageService.relationTree(resp.data)
                // scope.authorityData = resp.data
            }) 
        })
        

        scope.$on('$destroy',()=>{
            LoadingService.loaded()
        })
    }
    
  }

}]