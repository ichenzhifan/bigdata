'use strict';
module.exports = () => {
  
  return (input) => {
  	if(!input) return []
  	return JSON.parse(input)
  }

}