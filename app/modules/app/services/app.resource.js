'use strict';
module.exports = ['MobileService','Restangular',
(MobileService,Restangular)=>{
	var service = {
		getAllApps:()=>{
			return MobileService.one('/app/admin/applications').get('')
		},
		getAppById:(id)=>{
			return MobileService.one('/app/admin/applications',id).get()
		},
		editApp:(app)=>{
			return MobileService.one('/app/admin/applications',app.data.application_id).post('',app)
		},
		getUsersByApplicationId:(id)=>{
			return MobileService.one('/app/admin/applications',id).one('/users').get()
		},
		addApp:(app)=>{
			return MobileService.one('/app/admin/applications').post('',app)
		},
		editApplicationUsers:(id,users)=>{
			return MobileService.one('/app/admin/applications',id).one('/users').post('',users)	
		},
	}
	return service
}]