'use strict';
module.exports = ['MobileService','Restangular',
(MobileService,Restangular)=>{
	var service = {
		/**
	     * @ngdoc function
	     * @methodOf manage.service:groupResourceService
	     * @name deleteGroup
	     * @description 根据ID删除群组
	     * @param {String} id 群组ID
	     */
		deleteGroup:(id)=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/groups',id).remove()
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:groupResourceService
	     * @name getGroupById
	     * @description 根据ID查询群组信息
	     * @param {String} id 群组ID
	     */
		getGroupById:(id)=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/groups',id).get('')
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:groupResourceService
	     * @name editGroup
	     * @description 修改群组
	     * @param {Object} group 目标群组
	     */
		editGroup:(group)=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/groups',group.data.group_id).post('',group)
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:groupResourceService
	     * @name addGroup
	     * @description 新增群组
	     * @param {Object} group 目标群组
	     */
		addGroup:(group)=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/groups').post('',group)
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:groupResourceService
	     * @name addGroup
	     * @description 获取所有群组列表
	     * @return {Array} 群组列表
	     */
		getAllGroups:()=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/groups').get('') 
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:groupResourceService
	     * @name getAuthoritiesByGroupId
	     * @description 根据群组ID获取群组的权限信息
	     * @param {String} id 群组ID
	     */
		getAuthoritiesByGroupId:(id)=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/groups',id).one('/popedoms').get()
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:groupResourceService
	     * @name editGroupAuthorites
	     * @description 修改群组的权限信息
	     * @param {String} id 群组ID
	     * @param {Array} authorityList 群组权限列表
	     */
		editGroupAuthorites:(id,authorityList)=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/groups',id).one('/popedoms').post('',authorityList)
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:groupResourceService
	     * @name getIndexInGroupList
	     * @description 获取群组在群组列表中的索引
	     * @param {Object} group 群组
	     * @param {Array} groupList 群组列表
	     */
		getIndexInGroupList:(group,groupList)=>{
			if(!group || !groupList) return -1
			var tarIndex = -1
			groupList.forEach((g,index)=>{
				if(g.group_id === group.group_id){
					tarIndex = index
					return false 
				}
			})
			return tarIndex
		}
	}
	return service
}]