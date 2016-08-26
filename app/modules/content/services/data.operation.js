

module.exports = [
	()=>{
		var service = {
			/**
		       * @ngdoc function
		       * @methodOf content.service:dataOperationService
		       * @name getColByColIndex
		       * @description 将二维数据中的某一列转换成数组
		       * @param {Array} data 二维数据
		       * @param {Number} index 目标列
		       * @param {Number=} maxNum 能转的最大行数,为空表示无上限
		       * @return {Array} 由目标列组成的数组
		       */
			getColByColIndex:(data,index,maxNum)=>{
				if(index < 0 || index === undefined){
			      return []
			    }
			    var arr = [],i
			    for(i = 0;i < data.length; i++){
			    	if(i == maxNum){
			    		break;
			    	}
			    	arr.push(data[i][index])
			    	// arr.push(new Date(data[i][index]).getTime())
			    }
			    // data.forEach((v,vi)=>{
			    //   if(vi == maxNum){
			    //   	return false
			    //   }
			    //   console.log('vi :'+vi+'|maxNum :'+maxNum)
			    //   arr.push(v[index])
			    // })
			    return arr
			},
			/**
		       * @ngdoc function
		       * @methodOf content.service:dataOperationService
		       * @name getTimeColByColIndex
		       * @description 将二维数据中转换成只包含时间列和目标列的二维数组
		       * @param {Array} data 二维数据
		       * @param {Number} timeIndex 时间列
		       * @param {Number} index 目标列
		       * @param {Number=} maxNum 能转的最大行数,为空表示无上限
		       * @return {Array} 由时间列和目标列组成的二维数组
		       */
			getTimeColByColIndex:(data,timeIndex,index,maxNum)=>{
				if(index < 0 || index === undefined){
			      return []
			    }
			    var arr = [],i
			    for(i = 0;i < data.length; i++){
			    	if(i == maxNum){
			    		break;
			    	}
			    	arr.push([data[i][timeIndex],data[i][index]])
			    	// arr.push(new Date(data[i][index]).getTime())
			    }
			    // data.forEach((v,vi)=>{
			    //   if(vi == maxNum){
			    //   	return false
			    //   }
			    //   console.log('vi :'+vi+'|maxNum :'+maxNum)
			    //   arr.push(v[index])
			    // })
			    return arr
			},
			/**
		       * @ngdoc function
		       * @methodOf content.service:dataOperationService
		       * @name getColByColDoubleIndex
		       * @description 根据条目列对值列进行数据汇总,并生成图表的系列series
		       * @param {Array} data 二维数据
		       * @param {Number} vindex 时间列
		       * @param {Number} cindex 目标列
		       * @param {Number=} maxNum 能转的最大行数,为空表示无上限
		       * @return {Array} 生成的图表系列series
		       */
			getColByColDoubleIndex:(data,vindex,cindex,maxNum)=>{
				if(vindex < 0 || vindex === undefined){
			      return []
			    }
			    var arr = [],i,showFlg,categoryMap = {}
			    for(i = 0;i < data.length; i++){
			    	if(i > maxNum){
			    		showFlg=false
			    	}
			    	let name = data[i][cindex]
			    	if(!categoryMap[name]){
			    		categoryMap[name] = 
				    		{
				    		value:0,
				    		name:name,
				    		label:{
				    			normal:{
				    				show:showFlg
				    			}
				    		},
				    		labelLine:{
				    			normal:{
				    				show:showFlg
				    			}
				    		}
				    	}
				    	arr.push(categoryMap[name])
			    	}
			    	categoryMap[name].value += data[i][vindex]
			    }
			    return arr
			},
			/**
		       * @ngdoc function
		       * @methodOf content.service:dataOperationService
		       * @name mapToArray
		       * @description 将map的值转换成已排好序的数组
		       * @param {Object} map 原始map
		       * @return {Array} 排好序的数组
		       */
			mapToArray:(map)=>{
				if(!map) return []
				var arr = []
				for(var attr in map){
			    	arr.push(attr)
			    }
			    // return arr.sort((a,b)=>{
			    // 	console.log('a :'+a+'|b :'+b)
			    // 	console.log('a > b :',a>b)
			    // 	return a > b ？ 1 : -1
			    // })
			    return _.sortBy(arr)
			},
			/**
		       * @ngdoc function
		       * @methodOf content.service:dataOperationService
		       * @name concat
		       * @description 利用Array的reduce函数合并数据
		       * @param {Array} src 原数组
		       * @param {Array} dest 目标数组
		       * @return {Array} 合并后的数组
		       */
			concat:(src,dest)=>{
				return dest.reduce((arr,item)=>{
					arr.push(item)
				},src)
			},
			// mapToSeries:(map,category,type)=>{
			// 	if(!map || !category) return []
			// 	var series = [],legend =[],tmpSeries,tmp
			// 	for(var attr in map){
			// 		tmp = map[attr]
			// 		legend.push(attr)
			// 		tmpSeries = {
			// 			name : attr,
			// 			type : type,
			// 			data :[]
			// 		}
			// 		category.forEach((c)=>{
			// 			if(!tmp[c])
			// 				tmpSeries.data.push(null)
			// 			else
			// 				tmpSeries.data.push(tmp[c])
			// 		})
			// 		series.push(tmpSeries)
			// 	}
			// 	legend = legend.sort((a,b)=>{
			// 		var diff = a.length - b.length
			// 		if(diff === 0){
			// 			diff =  a >= b ? 1 : -1
			// 		}
			// 		// console.log(a,b,diff)
			// 		return diff
			// 	})
			// 	return {
			// 		legend:legend,
			// 		// legend:_.sortBy(legend),
			// 		series:series
			// 	}
			// },
			/**
		       * @ngdoc function
		       * @methodOf content.service:dataOperationService
		       * @name mapToSeries
		       * @description 将Map转换成图表的系列和图例
		       * @param {Object} map 原Map
		       * @param {Array} category 图表的category
		       * @param {String} type 图表类型
		       * @return {Array} 图表的系列和图例
		       */
			mapToSeries:(map,category,type)=>{
				if(!map || !category) return []
				var series = [],legend =[],tmpSeries,tmp,oseries = [{
					name:'汇总',
					type:'bar',
					data:[]
				}]
				for(var attr in map){
					legend.push(attr)
				}
				legend = legend.sort((a,b)=>{
					var diff = a.length - b.length
					if(diff === 0){
						diff =  a >= b ? 1 : -1
					}
					// console.log(a,b,diff)
					return diff
				})
				for(var i = 0 ; i < legend.length; i++){
					tmp = map[legend[i]]
					tmpSeries = {
						name : legend[i],
						type : type,
						data :[]
					}
					let sum = 0
					category.forEach((c)=>{
						if(!tmp[c]){
							tmpSeries.data.push(null)
						}else{
							sum += tmp[c]
							tmpSeries.data.push(tmp[c])
						}

					})
					oseries[0].data.push(sum)
					series.push(tmpSeries)
				}
				return {
					legend:legend,
					oseries:oseries,
					// legend:_.sortBy(legend),
					series:series
				}
			},
			/**
		       * @ngdoc function
		       * @methodOf content.service:dataOperationService
		       * @name mapToTimeSeries
		       * @description 将Map转换成实时图表的系列和图例
		       * @param {Object} map 原Map
		       * @param {Array} category 图表的category
		       * @param {String} type 图表类型
		       * @return {Array} 实时图表的系列和图例
		       */
			mapToTimeSeries:(map,category,type)=>{
				if(!map || !category) return []
				var series = [],legend =[],tmpSeries,tmp
				for(var attr in map){
					legend.push(attr)
				}
				legend = legend.sort((a,b)=>{
					var diff = a.length - b.length
					if(diff === 0){
						diff =  a >= b ? 1 : -1
					}
					// console.log(a,b,diff)
					return diff
				})
				for(var i = 0 ; i < legend.length; i++){
					tmp = map[legend[i]]
					tmpSeries = {
						name : legend[i],
						type : type,
						symbolSize:2,
						data :[]
					}
					category.forEach((c)=>{
						if(!tmp[c])
							tmpSeries.data.push([c,null])
						else
							tmpSeries.data.push([c,tmp[c]])
					})
					series.push(tmpSeries)
				}
				return {
					legend:legend,
					// legend:_.sortBy(legend),
					series:series
				}
			},
			/**
		       * @ngdoc function
		       * @methodOf content.service:dataOperationService
		       * @name getSeriesNameByGroupIndex
		       * @description 将数据转成图表的类目,图例和系列
		       * @param {Array} data 原始数据
		       * @param {Number} groupIndex 根据某一列进行分组
		       * @param {Number} categoryIndex 类目列
		       * @param {Object} valueObj 值对象，包含值列和图表类型
		       * @param {Boolean} chartStatus 是否计算汇总，为true,则返回汇总的系列和图例
		       * @return {Array} 图表的系列和图例
		       */
			getSeriesNameByGroupIndex:(data,groupIndex,categoryIndex,valueObj,chartStatus)=>{
				if(groupIndex < 0 || groupIndex === undefined){
			      return []
			    }
			    var groupMap = {},
			    	categoryMap = {},
			    	arr = [],
			    	valueIndex = valueObj.value,
			    	category,
			    	tmpGroupVal,
			    	tmpCategoryVal,
			    	result
			    data.forEach((v)=>{
			    	tmpGroupVal = v[groupIndex]
			    	tmpCategoryVal = v[categoryIndex]
			    	categoryMap[tmpCategoryVal] = true
			    	if(!groupMap[tmpGroupVal]) {groupMap[tmpGroupVal] = {}}
			    	groupMap[tmpGroupVal][tmpCategoryVal] = v[valueIndex]
			    })
			    category = service.mapToArray(categoryMap)
			    // console.log('category :',category)
			    result = service.mapToSeries(groupMap,category,valueObj.type)
			    if(chartStatus){
			    	return {
				    	category:category,
				    	legend:result.legend,
				    	series:result.series,
				    	ocategory:result.legend,
				    	olegend:['汇总'],
				    	oseries:result.oseries
				    }
			    }
			    return {
			    	category:category,
			    	legend:result.legend,
			    	series:result.series
			    }
			},
			/**
		       * @ngdoc function
		       * @methodOf content.service:dataOperationService
		       * @name getTimeSeriesNameByGroupIndex
		       * @description 将数据转成实时图表的类目,图例和系列
		       * @param {Array} data 原始数据
		       * @param {Number} groupIndex 根据某一列进行分组
		       * @param {Number} categoryIndex 类目列
		       * @param {Object} valueObj 值对象，包含值列和图表类型
		       * @return {Array} 实时图表的系列和图例
		       */
			getTimeSeriesNameByGroupIndex:(data,groupIndex,categoryIndex,valueObj)=>{
				if(groupIndex < 0 || groupIndex === undefined){
			      return []
			    }
			    var groupMap = {},
			    	categoryMap = {},
			    	arr = [],
			    	valueIndex = valueObj.value,
			    	category,
			    	tmpGroupVal,
			    	tmpCategoryVal,
			    	result
			    data.forEach((v)=>{
			    	tmpGroupVal = v[groupIndex]
			    	tmpCategoryVal = v[categoryIndex]
			    	categoryMap[tmpCategoryVal] = true
			    	if(!groupMap[tmpGroupVal]) {groupMap[tmpGroupVal] = {}}
			    	groupMap[tmpGroupVal][tmpCategoryVal] = v[valueIndex]
			    })
			    category = service.mapToArray(categoryMap)
			    // console.log('category :',category)
			    result = service.mapToTimeSeries(groupMap,category,valueObj.type)
			    return {
			    	category:category,
			    	legend:result.legend,
			    	series:result.series
			    }
			}
		}
		return service
	}
]