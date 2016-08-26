"use strict"
module.exports = [

  () => {
    var cache = window.localStorage

    var service = {
      get:(key)=>{
        if(!key) return null
        var ret
        try{
          ret = cache.getItem(key)
          ret = JSON.parse(ret)
        }catch(e){
        }
        return ret
      },
      set:(key,value)=>{
        if(!key) return null
        cache.setItem(key,JSON.stringify(value))
        return value
      },
      remove:(key)=>{
        if(!key) return 

        cache.removeItem(key)
      }
    }
    return service
  }
]
  