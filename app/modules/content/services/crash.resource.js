"use strict"
module.exports = [
  '$rootScope', 'MobileService', 'Memorykey','MemoryCache' ,'Notification',
  ($rootScope, MobileService,Memorykey, MemoryCache,Notification) => {
    

    var service = {
      getCrashList:(param,curtype)=>{
        return MobileService.one(MobileService.getAppPrefix()+'/crash/MedusaCrash').post('',param).then((resp)=>{
          var oprs = curtype.oprs
          ,content
          resp.data.forEach((d,dindex)=>{
            content = '<div class="opr-group">'
            oprs.forEach((opr)=>{
              content += `<button class="btn btn-flat ${opr.clz}" opr="${opr.fun}" rowindex="${dindex}" >${opr.text}</button>`
            })
            content += '</div>'
            d.push(content)
          })
          return {
            data:resp.data,
            titles : resp.titles
          }
        })
      },
      getCrashParam:()=>{
        return MobileService.one(MobileService.getAppPrefix()+'/crash/MedusaCrash/versionRequest').post('',{
          param:{
            getVersion:'version'
          }
        }).then((resp)=>{
          var data = resp.data
          ,versionArr = []
          ,maxCrash = data[1][0]
          data[0].forEach((item)=>{
            versionArr.push({
              name:`版本-${item}`,
              value:item
            })
          })
          return {
            version_option:{
              data:versionArr,
              min:versionArr[0],
              max:versionArr[versionArr.length-1]
            },
            crash_option:{
              low:1,
              high:maxCrash,
              min:1,
              max:maxCrash
            }
          }
        })
      },
      solveCrash:(param)=>{
        return MobileService.one(MobileService.getAppPrefix()+'/crash/MedusaCrash/markResolve').post('',param)
      },
      crashDetail:(param)=>{
        return MobileService.one(MobileService.getAppPrefix()+'/crash/MedusaCrash/detailInfo').post('',param)
      },
      crashHistory:(param)=>{
        return MobileService.one(MobileService.getAppPrefix()+'/crash/MedusaCrash/resolveHistory').post('',param)
      },
      crashReminder:()=>{
        return MobileService.one(MobileService.getAppPrefix()+'/message/msgList').post('',{
          param:{
            reminder:'reminder'
          }
        })
      }
    }

    return service
  }
]
  