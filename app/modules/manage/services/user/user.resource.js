'use strict';
module.exports = ['MobileService','Restangular',
(MobileService,Restangular,MemoryCache,Memorykey)=>{
	var groupList,groupMap = {},service = {
		test:()=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/users','123').remove()
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:userResourceService
	     * @name getGroupList
	     * @description 获取所有群组列表
	     * 
	     */
		getGroupList:()=>{
			return groupList
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:userResourceService
	     * @name getGroupMap
	     * @description 获取所有群组map
	     * 
	     */
		getGroupMap:()=>{
			return groupMap
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:userResourceService
	     * @name deleteUser
	     * @description 解锁|锁定用户
	     *
	     * @param {Object} user 目标用户
	     */
		deleteUser:(user)=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/users',user.data.user_id).post('lock',user)
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:userResourceService
	     * @name getUserById
	     * @description 根据用户ID查询用户信息
	     * @param {String} id 用户ID
	     */
		getUserById:(id)=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/users',id).get()
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:userResourceService
	     * @name getUserById
	     * @description 修改用户信息
	     * @param {Object} user 目标用户
	     */
		editUser:(user)=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/users',user.data.user_id).post('',user)
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:userResourceService
	     * @name addUser
	     * @description 修改用户信息
	     * @param {Object} user 目标用户
	     */
		addUser:(user)=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/users').post('',user)
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:userResourceService
	     * @name getAllUsers
	     * @description 获取用户列表
	     */
		getAllUsers:()=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/users').get('')
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:userResourceService
	     * @name getAuthoritiesByUserId
	     * @description 根据用户ID获取用户的权限信息
	     * @param {String} id 用户ID
	     */
		getAuthoritiesByUserId:(id)=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/users',id).one('/popedoms').get()
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:userResourceService
	     * @name editUserAuthorities
	     * @description 修改用户权限信息
	     * @param {String} id 用户ID
	     * @param {Array} authorityList 用户的权限信息
	     */
		editUserAuthorities:(id,authorityList)=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/users',id).one('/popedoms').post('',authorityList)
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:userResourceService
	     * @name getAllUsers
	     * @description 获取所有的群组列表,并缓存到groupList和groupMap中
	     */
		getAllGroups:()=>{
			return MobileService.one(MobileService.getAppPrefix()+'/admin/groups/menu').get().then((resp)=>{
				groupList = resp.data
				groupList.forEach((g)=>{
					groupMap[g.group_id] = g.group_name
				})
				return groupMap
			})
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:userResourceService
	     * @name getGroupById
	     * @description 根据ID获取群组
	     * @param {String} id 群组ID
	     * @param {Array} groups 群组列表
	     */
		getGroupById:(id,groups)=>{
			if(!id || !groups) return null
			var gp = null
			groups.forEach((g)=>{
				if(g.group_id === id){
					gp = g
					return false
				}
			})
			return gp
		},
		/**
	     * @ngdoc function
	     * @methodOf manage.service:userResourceService
	     * @name valid
	     * @description 校验用户信息
	     * @param {Object} user 待校验用户
	     */
		valid:(user)=>{
			if(!user) return '用户信息不能为空'
			if(!user.group_id) return '用户群组不能为空' 
			user.is_admin = user.is_admin ? 1:0
			user.user_state = user.user_state ? 1:0
			return ''
		}
	}
	return service
}]