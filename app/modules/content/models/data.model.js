"use strict"
class DataModel {
  constructor(data,opt){
    this.data = data
    this.opt = opt
    this.opt.data = null
  }
  // addColsToVals(cols,vals){
  //   cols.forEach((c,i)=>{
  //     vals[i].unshift(c)
  //   })
  // }
  // getRowByRowIndex(index){
  //   if(!index || index < 0){
  //     return {}
  //   }
  //   return {
  //     name :this.rows[index],
  //     series:this.vals[index]
  //   }
  // }
  getColByColIndex(index){
    if(this.opt.data) return this.opt.data
    if(!index || index < 0){
      return []
    }
    this.opt.data = []
    this.data.forEach((v)=>{
      this.opt.data.push(v[index])
    })
    return this.opt.data
  }




}



module.exports = [
  () => {
    return DataModel
  }
]