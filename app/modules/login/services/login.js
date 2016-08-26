"use strict"
module.exports = ['MobileService',"Memorykey","MemoryCache","$state",
	(MobileService,Memorykey,MemoryCache,$state)=>{
		var service = {
			login:(user)=>{
				return MobileService.one('/login').post('',user).then((resp)=>{
					MemoryCache.set(Memorykey.TOKEN_KEY,resp.token)
					MemoryCache.set(Memorykey.USER_KEY,resp.user)
					MemoryCache.set(Memorykey.APPS_KEY,resp.data)
					MobileService.setDefaultHeaders({token: resp.token}) 
					// MobileService.setDefaultRequestParams({token: token})
					$state.go("dashboard",{apps:resp.data})
				})
			}
		}
		return service
	}
]