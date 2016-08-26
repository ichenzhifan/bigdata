"use strict"
module.exports = [
()=>{
	var cache = {
		scroll:0
	}
	var service = {
		 getScroll:()=>{
		 	return cache
		 },
		 init:()=>{
		 	window.onscroll = ($event)=>{
		 		cache.scroll = window.scrollY
		 	}
		 },
		 destroy:()=>{
		 	window.onscroll = null
		 	cache.scroll = 0
		 }
	}
	return service
}]