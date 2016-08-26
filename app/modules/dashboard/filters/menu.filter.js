'use strict';
module.exports = () => {
  
  return (input,searchMenu) => {
    console.log('go here')
      if(!searchMenu || searchMenu == ''){
            return input
      }
      var ret = [],diguiFlg = (obj)=>{
        var flg = false;
        obj.forEach((o)=>{
          o.meflg = false
          o.ndsflg = false
          if(o.title.indexOf(searchMenu) >= 0){
            o.meflg  = true
            flg = true
          }else if(o.nodes){
            o.ndsflg = diguiFlg(o.nodes)
            o.ndsflg && (flg = true)
          }
        })
        return flg
      },diguiVal = (obj) =>{
        var arr = [],tmp
        obj.forEach((o)=>{
          if(o.meflg){
            tmp = cloneObj(o)
            tmp.nodes = o.nodes
          }else if(o.ndsflg){
            tmp = cloneObj(o)
            tmp.nodes = diguiVal(o.nodes)
          }else{
            tmp = null
          }
          tmp && (arr.push(tmp))
        })
        return arr
      },cloneObj = (obj)=>{
        var retObj = {}
        for(var attr in obj){
          if(attr != 'nodes'){
            retObj[attr] = obj[attr]
          }
        }
        return retObj
      }

      diguiFlg(input)
      return diguiVal(input)

  }
}