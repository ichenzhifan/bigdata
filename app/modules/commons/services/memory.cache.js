"use strict"
module.exports = [

  () => {
    var cache = window.sessionStorage

    var service = {
      /**
       * @ngdoc function
       * @methodOf common.service:MemoryCache
       * @name get
       * @description 根据key获取对象
       * @param {string} key 键值
       * @return {object} JSON对象
       */
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
      /**
       * @ngdoc function
       * @methodOf common.service:MemoryCache
       * @name get
       * @description 根据key设置对象
       * @param {string} key 键值
       * @param {Object} value JSON对象
       */
      set:(key,value)=>{
        if(!key) return null
        cache.setItem(key,JSON.stringify(value))
        return value
      },
      /**
       * @ngdoc function
       * @methodOf common.service:MemoryCache
       * @name remove
       * @description 根据key删除对象
       * @param {string} key 键值
       */
      remove:(key)=>{
        if(!key) return 

        cache.removeItem(key)
      }
    }
    return service
  }
]
  