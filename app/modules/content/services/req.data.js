module.exports = ['MobileService','Notification','dashboardService',
	(MobileService,Notification,dashboardService)=>{
		var serivce = {
			/**
		       * @ngdoc function
		       * @methodOf content.service:reqDataService
		       * @name reqGeneralData
		       * @description 默认向 [当前应用]/common/getJsonData请求数据,如果prefix不为空，则向[当前应用]/common/{prefix}请求数据
		       * @param {Object} param 请求参数
		       * @param {string} prefix 请求url后缀
		       */
			reqGeneralData:(param,prefix)=>{
				prefix = prefix || 'getJsonData'
				return MobileService.one(MobileService.getAppPrefix()+'/common/'+prefix).customPOST({data:param})
			},
			/**
		       * @ngdoc function
		       * @methodOf content.service:reqDataService
		       * @name reqTimeData
		       * @description 向 [当前应用]/common/getJsonData请求数据,供实时图表请求数据
		       * @param {Object} param 请求参数
		       */
			reqTimeData:(param)=>{
				return MobileService.one(MobileService.getAppPrefix()+'/common/getJsonData').customPOST({data:param})
			}
		}

		return serivce
	}

]