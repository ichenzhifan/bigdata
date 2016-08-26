'use strict';
module.exports = ['$uibModal','$rootScope','authorityResourceService',
($uibModal,$rootScope,authorityResourceService)=>{
	var service = {
		/**
	     * @ngdoc function
	     * @methodOf manage.service:authorityManageService
	     * @name add
	     * @description 弹出新增权限信息模态框
	     * 
	     */
		add:(data)=>{
    		var editModalInstance = $uibModal.open({
		      templateUrl: 'modules/manage/views/authority/authority.add.html',
		      controller: 'authorityAddCtrl',
		      backdrop: 'static',
		      openedClass:'scrollbd',
		      size:'complex',
		      resolve: {
		        userData: function () {
		          return data
		        }
		        ,reqData: function () {
		          return authorityResourceService.getAuthorityById(data.popedom_id).then((resp)=>{
		          	return resp.data
		          })
		        }
		      }
		    });
		    editModalInstance.result.then(function (data) {
		    	$rootScope.$broadcast('expand',data)
		    });
    	},

    	addRoot:(data)=>{
    		var editModalInstance = $uibModal.open({
		      templateUrl: 'modules/manage/views/authority/authority.edit.html',
		      controller: 'authorityAddRootCtrl',
		      backdrop: 'static',
		      openedClass:'scrollbd',
		      resolve: {
		        userData: function () {
		          return data;
		        }
		      }
		    });
    	},
    	/**
	     * @ngdoc function
	     * @methodOf manage.service:authorityManageService
	     * @name edit
	     * @description 弹出修改权限信息模态框
	     * 
	     */
        edit:(data)=>{
            var editModalInstance = $uibModal.open({
		      templateUrl: 'modules/manage/views/authority/authority.edit.html',
		      controller: 'authorityEditCtrl',
		      openedClass:'scrollbd',
		      backdrop: 'static',
		      size:'complex',
		      resolve: {
		        userData: function () {
		          return data;
		        },
		        reqData:()=>{
		        	return authorityResourceService.getAuthorityById(data.popedom_id)
		        }
		      }
		    });

		    // editModalInstance.result.then(function (data) {

		    // }, function () {
		    //   // console.log('Modal dismissed at: ' + new Date());
		    // });
        },

        del:(data)=>{ 
        	var editModalInstance = $uibModal.open({
		      templateUrl: 'modules/commons/views/confirm.html',
		      controller: 'authorityDelCtrl',
		      openedClass:'scrollbd',
		      resolve: {
		        userData:  ()=> {
		          return data
		        },
		        title:()=>{
		        	return '确定要删除【'+data.title+'及其子节点】?'
		        }
		      }
		    });

		  //   editModalInstance.result.then(function () {
				// console.log('confirmed')
		  //   }, function () {
		  //     // console.log('Modal dismissed at: ' + new Date());
		  //   });
        },
        /**
	     * @ngdoc function
	     * @methodOf manage.service:authorityManageService
	     * @name group
	     * @description 弹出指派权限的群组模态框
	     * 
	     */
        group:(data)=>{ 
        	var editModalInstance = $uibModal.open({
		      templateUrl: 'modules/manage/views/authority/authority.group.html',
		      controller: 'authorityGroupCtrl',
		      openedClass:'scrollbd',
		      backdrop: 'static',
		      size:'complex',
		      resolve: {
		        userData:  ()=> {
		          return data
		        },
		        reqData:  ()=> {
		          return authorityResourceService.getAuthorityGroups(data.popedom_id).then((resp)=>{
		          	return resp.data
		          })
		        }
		      }
		    });

		  //   editModalInstance.result.then(function () {
				// console.log('confirmed')
		  //   }, function () {
		  //     // console.log('Modal dismissed at: ' + new Date());
		  //   });
        },
        /**
	     * @ngdoc function
	     * @methodOf manage.service:authorityManageService
	     * @name user
	     * @description 弹出指派权限的用户模态框
	     * 
	     */
        user:(data)=>{ 
        	var editModalInstance = $uibModal.open({
		      templateUrl: 'modules/manage/views/authority/authority.user.html',
		      controller: 'authorityUserCtrl',
		      openedClass:'scrollbd',
		      backdrop: 'static',
		      size:'complex',
		      resolve: {
		        userData:  ()=> {
		          return data
		        },
		        reqData:  ()=> {
		          return authorityResourceService.getAuthorityUsers(data.popedom_id).then((resp)=>{
		          	return resp.data
		          })
		        }
		      }
		    });

		  //   editModalInstance.result.then(function () {
				// console.log('confirmed')
		  //   }, function () {
		  //     // console.log('Modal dismissed at: ' + new Date());
		  //   });
        },
	}
	return service
}]