module.exports = ['MobileService','Notification','$uibModal','crashResource',
	(MobileService,Notification,$uibModal,crashResource)=>{
		var serivce = {
			solve:(data)=>{
				var editModalInstance = $uibModal.open({
			      templateUrl: 'modules/content/views/crash/crash.resolve.html',
			      controller: 'crashResolveCtrl',
			      openedClass:'scrollbd',
			      resolve: {
			        crashData:  ()=> {
			          return data
			        }
			      }
			    })
			},
			info:(data,type)=>{
				var editModalInstance = $uibModal.open({
			      templateUrl: 'modules/content/views/crash/crash.info.html',
			      controller: 'crashInfoCtrl',
			      openedClass:'scrollbd',
		      	  size: 'complex',
			      resolve: {
			        crashData:  ()=> {
			          return data
			        },
			        infoData: ()=>{
			          return crashResource.crashDetail({param:{
			          	crash_id:data[0]+'',
			          	limit_num:'100',
			          	crashType:type.type
			          }})
			        }
			      }
			    })
			},
			history:(data)=>{
				var editModalInstance = $uibModal.open({
			      templateUrl: 'modules/content/views/crash/crash.history.html',
			      controller: 'crashHistoryCtrl',
			      openedClass:'scrollbd',
		      	  size: 'complex',
			      resolve: {
			        crashData:  ()=> {
			          return data
			        },
			        infoData: ()=>{
			          return crashResource.crashHistory({param:{
			          	crash_id:data[0]+'',
			          	limit_num:'100'
			          }})
			        }
			      }
			    })
			},
			getVersion:(input,val,flg) => {
		        var arr = []
		    	if(!input) return arr
		        if(flg){
		            input.forEach((item)=>{
		                if(!val || item.value >= val.value){
		                    arr.push(item)
		                }
		            })
		        }else{
		            input.forEach((item)=>{
		                if(!val || item.value <= val.value){
		                    arr.push(item)
		                }
		            })
		        }
		        return arr
			}
		}

		return serivce
	}

]