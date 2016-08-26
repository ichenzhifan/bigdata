'use strict';
module.exports = ['MobileService','Restangular','LoadingService','$timeout',
(MobileService,Restangular,LoadingService,$timeout)=>{
	var groupList,groupMap = {},service = {

		deleteAuthority:(id)=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/popedoms',id).remove()
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:authorityResourceService
	     * @name deleteAuthority
	     * @description 根据权限id获取权限信息
	     * 
	     */
		getAuthorityById:(id)=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/popedoms',id).get()
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:authorityResourceService
	     * @name editAuthority
	     * @description 修改权限信息
	     * @param {Object} authority 权限信息
	     * 
	     */
		editAuthority:(authority)=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/popedoms',authority.data.popedom_id).post('',authority)
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:authorityResourceService
	     * @name addAuthority
	     * @description 新增权限信息
	     * @param {Object} authority 权限信息
	     * 
	     */
		addAuthority:(authority)=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/popedoms').post('',authority)
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:authorityResourceService
	     * @name getAllAuthority
	     * @description 获取权限列表
	     * 
	     */
		getAllAuthority:()=>{
			// LoadingService.loading()
			return MobileService.one(MobileService.getAppPrefix()+'/admin/popedoms').get('').finally(()=>{
				// LoadingService.loaded() 
			})
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:authorityResourceService
	     * @name getAuthorityGroups
	     * @description 根据权限ID获取具有该权限的群组
	     * @param {String} id 权限id
	     */
		getAuthorityGroups:(id)=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/popedoms',id).one('groups').get()	
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:authorityResourceService
	     * @name editAuthorityGroups
	     * @description 修改具有该权限的群组列表
	     * @param {String} id 权限id
	     * @param {Array} groups 群组列表
	     */
		editAuthorityGroups:(id,groups)=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/popedoms',id).one('groups').post('',groups)	
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:authorityResourceService
	     * @name getAuthorityUsers
	     * @description 根据权限ID获取具有该权限的用户
	     * @param {String} id 权限id
	     */
		getAuthorityUsers:(id)=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/popedoms',id).one('users').get()	
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:authorityResourceService
	     * @name editAuthorityUsers
	     * @description 修改具有该权限的用户列表
	     * @param {String} id 权限id
	     * @param {Array} users 用户列表
	     */
		editAuthorityUsers:(id,users)=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/popedoms',id).one('users').post('',users)	
		},
		getGroupList:()=>{
			return groupList
		},
		getGroupMap:()=>{
			return groupMap
		},
		getAllGroups:()=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/groups/menu').get().then((resp)=>{
				groupList = resp.data
				groupList.forEach((g)=>{
					groupMap[g.group_id] = g.group_name
				})
				return groupMap
			})
		},
	}
	return service
}]