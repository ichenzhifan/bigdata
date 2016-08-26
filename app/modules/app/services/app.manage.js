'use strict';
module.exports = ['$uibModal','appResourceService',
($uibModal,appResourceService)=>{
	var service = {
		add:(data,allApp,appTable)=>{
    		var editModalInstance = $uibModal.open({
		      templateUrl: 'modules/app/views/app.add.html',
		      controller: 'addAppCtrl',
		      backdrop: 'static',
		      openedClass:'scrollbd',
		      resolve: {
		        appData: function () {
		          return allApp
		        },
		        appTable:()=>{
		        	return appTable
		        }
		      }
		    });
    	},
        edit:(data)=>{
            var editModalInstance = $uibModal.open({
		      templateUrl: 'modules/app/views/app.edit.html',
		      controller: 'editAppCtrl',
		      backdrop: 'static',
		      openedClass:'scrollbd',
		      resolve: {
		        appData: function () {
		          return data;
		        },
		        reqData:()=>{
		        	return appResourceService.getAppById(data.application_id).then((resp)=>{
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
        users:(data)=>{
        	var editModalInstance = $uibModal.open({
		      templateUrl: 'modules/app/views/app.users.html',
		      controller: 'appUsersCtrl',
		      openedClass:'scrollbd',
		      backdrop: 'static',
		      size:'complex',
		      resolve: {
		        appData:  ()=> {
		          return data
		        }
		        ,reqData:  ()=> {
		          return appResourceService.getUsersByApplicationId(data.application_id).then((resp)=>{
		          	return resp.data
		          })
		        }
		      }
		    });
        }
	}
	return service
}]