"use strict"
module.exports = ['MobileService','MemoryCache','Memorykey','$state','$rootScope',
(MobileService,MemoryCache,Memorykey,$state,$rootScope)=>{
	var cache = {
		menus : [],
		config : {}
	}
	var service = {
		/**
	       * @ngdoc function
	       * @methodOf dashboard.service:dashboardService
	       * @name getMenus
	       * @description 获取数据图表页的左边菜单
	       * @return {Object} 菜单
	       */
		getMenus:()=>{
			return cache
		},
		/**
	       * @ngdoc function
	       * @methodOf dashboard.service:dashboardService
	       * @name changeApp
	       * @description 切换应用
	       * @param {String} app 目标应用
	       */
		changeApp:(app)=>{
		  console.log('app :',app)
          MobileService.changeAppPrefix(app)
		},
		/**
	       * @ngdoc function
	       * @methodOf dashboard.service:dashboardService
	       * @name loadMenus
	       * @description 根据当前选中的应用请求菜单数据,成功拿到数据后，发送changeMenus事件
	       */
		loadMenus:()=>{
			var user = MemoryCache.get(Memorykey.USER_KEY)
			MobileService.one(MobileService.getAppPrefix()+'/asset',user.user_id).get().then((resp)=>{
				cache.menus = resp.data
				// cache.config = service.getFirstMenu(cache.menus)
				$rootScope.$broadcast('changeMenus',cache)
				return cache
			})
		},
		/**
	       * @ngdoc function
	       * @methodOf dashboard.service:dashboardService
	       * @name emptyCache
	       * @description 清空菜单
	       */
		emptyCache:()=>{
			cache = {
				menus : [],
				config : {}
			}
		},
		/**
	       * @ngdoc function
	       * @methodOf dashboard.service:dashboardService
	       * @name getFirstMenu
	       * @description 获取第一个可加载图表的菜单
	       */
		getFirstMenu:(menus)=>{
			if(!menus) return null
			var tar = menus[0]
			while(tar.nodes && tar.nodes.length > 0){
				tar = tar.nodes[0]
			}
			if(!tar.toJsonFlg && tar.config){
				tar.config = JSON.parse(tar.config)
				tar.toJsonFlg = true
			}
			return tar
		}
	}
	return service
}]