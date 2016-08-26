"use strict"
module.exports = [
  '$rootScope',
  ($rootScope) => {
    var service = {
    	fixData:(data)=>{
    		if(!data) return
    		data.forEach((dt)=>{
    			var tmp
	    		for(var i = 0 ; i < dt.data.length; i++){
	    			tmp = dt.data[i]
	    			tmp.selectItem = []
	    			if(i === 0){
	    				tmp.parentItem = {id:'NAN'}
	    			}else{
	    				tmp.parentItem = dt.data[i-1].selectItem
	    			}
	    		}
    		})
    		return data
    	}
    }

    return service
  }
]