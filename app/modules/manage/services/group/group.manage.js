'use strict';
module.exports = ['$uibModal','groupResourceService',
($uibModal,groupResourceService)=>{
	var service = {
		/**
	     * @ngdoc function
	     * @methodOf manage.service:groupManageService
	     * @name add
	     * @description 弹出新增群组信息模态框
	     * 
	     */
		add:(data,allData,tableData)=>{
    		var editModalInstance = $uibModal.open({
		      templateUrl: 'modules/manage/views/group/group.add.html',
		      controller: 'groupAddCtrl',
		      backdrop: 'static',
		      openedClass:'scrollbd',
		      resolve: {
		        userData: function () {
		          return allData;
		        },
		        tableData:()=>{
		        	return tableData
		        }
		      }
		    });
    	},
    	/**
	     * @ngdoc function
	     * @methodOf manage.service:groupManageService
	     * @name edit
	     * @description 弹出修改群组信息模态框
	     * 
	     */
        edit:(data)=>{
            var editModalInstance = $uibModal.open({
		      templateUrl: 'modules/manage/views/group/group.edit.html',
		      controller: 'groupEditCtrl',
		      openedClass:'scrollbd',
		      backdrop: 'static',
		      resolve: {
		        groupData: function () {
		          return data;
		        },
		        reqData:()=>{
		        	return groupResourceService.getGroupById(data.group_id).then((resp)=>{
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
        del:(data)=>{ 
        	var editModalInstance = $uibModal.open({
		      templateUrl: 'modules/commons/views/confirm.html',
		      controller: 'groupDelCtrl',
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
	     * @methodOf manage.service:groupManageService
	     * @name authority
	     * @description 弹出群组权限信息模态框
	     */
        authority:(data)=>{
        	var editModalInstance = $uibModal.open({
		      templateUrl: 'modules/manage/views/group/group.authority.html',
		      controller: 'groupAuthorityCtrl',
		      openedClass:'scrollbd',
		      backdrop: 'static',
		      size:'flex',
		      resolve: {
		        userData:  ()=> {
		          return data
		        }
		        ,reqData:  ()=> {
		          return groupResourceService.getAuthoritiesByGroupId(data.group_id)
		        }
		      }
		    });
        }
      //   user:(data)=>{
      //   	var editModalInstance = $uibModal.open({
		    //   templateUrl: 'modules/manage/views/group/group.user.html',
		    //   controller: 'groupUserCtrl',
		    //   openedClass:'scrollbd',
		    //   // size: 'lg',
		    //   resolve: {
		    //     userData:  ()=> {
		    //       return data
		    //     }
		    //   }
		    // });
      //   }
	}
	return service
}]