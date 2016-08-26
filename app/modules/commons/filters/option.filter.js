module.exports = [ 
() => {
	return (input,parent) => {
    	var arr = []
    	if(!parent || parent.id === -1) return arr
    	if(parent.id === 'NAN'){
    		return input
    	}
    	if(input){
    		input.forEach((e)=>{
    			if(e.pid === parent.id){
    				arr.push(e)
    			}
    		})
    	}
    	return arr
	}
}]