module.exports = [ 
() => {
	return (input,val,search,flg) => {
        var arr = []
    	if(!input) return arr
        if(flg){
            input.forEach((item)=>{
                if((!val || item.value >= val.value) && (!search || item.name.indexOf(search) >= 0)){
                    arr.push(item)
                }
            })
        }else{
            input.forEach((item)=>{
                if(!val || item.value <= val.value && (!search || item.name.indexOf(search) >= 0)){
                    arr.push(item)
                }
            })
        }
        return arr
	}
}]