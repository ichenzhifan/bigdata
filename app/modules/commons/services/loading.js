"use strict"
module.exports = [
  '$rootScope',
  ($rootScope) => {
    var obj = {
      isLoading : false
    },service = {
      getIsLoading:()=>{
        return obj
      },
      loading:()=>{
        obj.isLoading = true
      },
      loaded:()=>{
        obj.isLoading  = false
      }
    }
    return service
  }
]
  