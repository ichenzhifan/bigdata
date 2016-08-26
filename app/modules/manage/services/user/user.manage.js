'use strict';
module.exports = ['$uibModal','userResourceService',
($uibModal,userResourceService)=>{
	var service = {
		/**
	     * @ngdoc function
	     * @methodOf manage.service:userManageService
	     * @name add
	     * @description 弹出新增用户信息模态框
	     * 
	     */
		add:(data,allUser,userTable)=>{
    		var editModalInstance = $uibModal.open({
		      templateUrl: 'modules/manage/views/user/user.add.html',
		      controller: 'userAddCtrl',
		      backdrop: 'static',
		      openedClass:'scrollbd',
		      resolve: {
		        userData: function () {
		          return allUser;
		        },
		        userTable:()=>{
		        	return userTable
		        }
		      }
		    });
    	},
    	/**
	     * @ngdoc function
	     * @methodOf manage.service:userManageService
	     * @name edit
	     * @description 弹出修改用户信息模态框
	     */
        edit:(data)=>{
            var editModalInstance = $uibModal.open({
		      templateUrl: 'modules/manage/views/user/user.edit.html',
		      controller: 'userEditCtrl',
		      backdrop: 'static',
		      openedClass:'scrollbd',
		      size: 'flex',
		      resolve: {
		        userData: function () {
		          return data;
		        },
		        reqData:()=>{
		        	return userResourceService.getUserById(data.user_id).then((resp)=>{
		        		return resp.data
		        	})
		        }
		      }
		    });

		    // editModalInstance.result.then(function (data) {

		    // }, function () {
		    //   // console.log('Modal dismissed at: ' + new Date());
		    // });
        },
        /**
	     * @ngdoc function
	     * @methodOf manage.service:userManageService
	     * @name del
	     * @description 弹出修改解锁|锁定确认模态框
	     */
        del:(data)=>{ 
        	var editModalInstance = $uibModal.open({
		      templateUrl: 'modules/commons/views/confirm.html',
		      controller: 'userDelCtrl',
		      openedClass:'scrollbd',
		      resolve: {
		        userData:  ()=> {
		          return data
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
	     * @methodOf manage.service:userManageService
	     * @name info
	     * @description 弹出用户权限信息模态框
	     */
        info:(data)=>{
        	var editModalInstance = $uibModal.open({
		      templateUrl: 'modules/manage/views/user/user.info.html',
		      controller: 'userInfoCtrl',
		      openedClass:'scrollbd',
		      backdrop: 'static',
		      size: 'flex',
		      resolve: {
		        userData:  ()=> {
		          return data
		        }
		        ,reqData:  ()=> {
		          return userResourceService.getAuthoritiesByUserId(data.user_id)
		        }
		      }
		    });
        }
	}
	return service
}]