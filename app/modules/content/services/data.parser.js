
module.exports = ['dataOperationService',
	(dataOperationService)=>{
		var generate_option = (opt,colors,dt)=>{
			var chart_title = dt ?  opt.title+'['+dt+']' :opt.title  
			var cahceOpt = {
				title: {
	                text: chart_title
	            }, 
	            tooltip: {},
	            legend: {
	            	top:25,
	                data:[]
	            },
	            toolbox:{
	            	show:true,
	            	right:'4%',
	            	feature:{
	            		dataZoom:{
	            			show:true,
	            			iconStyle:{
	            				normal:{
	            					opacity:0
	            				},
	            				emphasis:{
	            					opacity:0
	            				}
	            			}
	            		},
	            		restore:{
	            			show:true,
	            			title:'还原'
	            		},
	            		magicType:{
	            			show:true ,
	            			type: ['line', 'bar', 'stack', 'tiled']
	            		}
            		}	
	            },
	            color:colors,
	            xAxis: {
	            	axisLabel:{
	            		interval:0,
	            		rotate:30,
	            		formatter:(value,index)=>{
	            			let tmpMoment = moment(value)
	            			if(tmpMoment.isValid() && (value+'').length >= 8 && (value+'').match(/^\d{4}-*/)){
	            				return tmpMoment.format('YYYY-MM-DD\(E\)')
	            			}
	            			return value
	            		},
	            		textStyle:{ //717FAB
	            			color:(value)=>{
	            				let tmpMoment = moment(value)
		            			if(tmpMoment.isValid() && (value+'').length >= 8 && tmpMoment.format('E') >= 6){
		            				return '#f3aa57'
		            			}
		            			return '#3c8dbc'
	            			}
	            		}
	            	},
	            	data:[]
	            },
	            yAxis: {
	            	// min:'dataMin',
	            	// max:'dataMax',
	            	scale:true,
	            	boundaryGap: ['0%', '5%'],
	            	axisLabel:{
	            		formatter:(value,index)=>{
	            			if(value >= 10000){
	            				return value/1000 +'k'
	            			}else if(value >= 10000000){
	            				return value/1000000 +'m'
	            			}else if(value >= 10000000000){
	            				return value/1000000000 +'b'
	            			}
	            			return value
	            			// let units = ['','k','m','b'],svalue = value+'',i,diff
	            			// for(i = svalue.length-1; i >= 0 ; i--){
	            			// 	if(svalue.charAt(i) !== '0'){
	            			// 		break
	            			// 	}
	            			// }
	            			// diff = ~~((svalue.length - i - 1) / 3)
	            			// return svalue.substring(0,svalue.length-diff * 3) + units[diff]
	            		}
	            	}
	            },
	            series: []
	            // animationDuration:500
			}
			if(opt.grid){
		    	cahceOpt.grid = opt.grid
		    }
		    if(opt.datazoom){
		    	cahceOpt.dataZoom = []
		    	opt.datazoom.forEach((type)=>{
		    		if(type == 'x'){
		    			cahceOpt.dataZoom.push({  
				            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
				            xAxisIndex: 0,
				            start: 0,      // 左边在 10% 的位置。
				            end: 100         // 右边在 60% 的位置。
				        })
		    		}else if(type == 'y'){
		    			cahceOpt.dataZoom.push({  
				            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
				            yAxisIndex: 0,
				            start: 0,      // 左边在 10% 的位置。
				            end: 100         // 右边在 60% 的位置。
				        })
		    		}
		    	})
		    }
			return  cahceOpt
		}
		,getTimeAxis = ()=>{
			return {
				type:'time',
		    	splitNumber:20,
		    	min : 'dataMin',
		    	max : 'dataMax',
		    	splitLine:{
		    		show:false
		    	},
		    	axisLabel:{
		    		formatter:(value,index)=>{
		    			return moment(value).format('HH:mm:ss')
		    		}
		    	}
			}
		}
		,parsers = {
			general:(data,opt,titles,colors,dt)=>{
				if(!opt.valueIndex) return
				opt.option = generate_option(opt,[],dt)
				if(opt.chartStatus){
					opt.tableInfo = {
						titles:[],
						data:[[]]
					}
					opt.ooption = generate_option(opt,colors,dt)
					opt.ooption.series.push({
						name:'汇总',
						type:'bar',
						data:[]
					})
					opt.ooption.legend.data.push('汇总')
					opt.ooption.xAxis.data = []
					opt.valueIndex.forEach((v)=>{
				    	let tmpdata = dataOperationService.getColByColIndex(data,v.value,opt.maxNum)
				    	opt.option.legend.data.push(titles[v.value])
				    	opt.option.series.push({
				    		name:titles[v.value],
				    		type:v.type ? v.type:'bar',
				    		data:tmpdata
				    	})
			    		let sum = 0
			    		opt.ooption.xAxis.data.push(titles[v.value])
			    		tmpdata.forEach((d)=>{
			    			sum += d
			    		})
			    		opt.tableInfo.titles.push(titles[v.value])
			    		opt.tableInfo.data[0].push(sum)
			    		opt.ooption.series[0].data.push(sum)
				    })
				}else{
					opt.tableInfo = null
					opt.valueIndex.forEach((v)=>{
				    	opt.option.legend.data.push(titles[v.value])
				    	opt.option.series.push({
				    		name:titles[v.value],
				    		type:v.type ? v.type:'bar',
				    		data:dataOperationService.getColByColIndex(data,v.value,opt.maxNum)
				    	})
				    })
				}
			    opt.option.xAxis.data = dataOperationService.getColByColIndex(data,opt.categoryIndex)
			},
			realtime:(data,opt,titles,colors,dt)=>{
				if(!opt.valueIndex) return
				opt.option = generate_option(opt,colors,dt)
			    opt.valueIndex.forEach((v)=>{
			    	opt.option.legend.data.push(titles[v.value])
			    	if(v.type == 'bar'){
			    		opt.option.series.push({
				    		name:titles[v.value],
				    		type:'bar',
				    		// data:dataOperationService.getColByColIndex(data,v.value,opt.maxNum)
				    		data:dataOperationService.getTimeColByColIndex(data,opt.categoryIndex,v.value,opt.maxNum)
				    	})
			    	}else{
			    		opt.option.series.push({
				    		name:titles[v.value],
				    		type:'line',
				    		symbolSize:2,
				    		areaStyle: {
				                normal: {
				                }
				            },
				    		data:dataOperationService.getTimeColByColIndex(data,opt.categoryIndex,v.value,opt.maxNum)
				    	})
			    	}
			    	
			    })
			    opt.option.tooltip = {
			    	formatter:(param)=>{
						var cate = moment(param.value[0]).format('HH:mm:ss')
						// console.log('cate :',cate)
						return `${param.seriesName}  ${cate}</br>${param.value[1]}`
					}
			    }
			    opt.option.xAxis = getTimeAxis()
			    opt.option.toolbox.feature.magicType = null
			    // opt.option.xAxis.data = dataOperationService.getColByColIndex(data,opt.categoryIndex).map((tm)=>{
			    // 	return new Date(tm)
			    // })
			},
			realtimegroup:(data,opt,titles,colors,dt)=>{
				if(!opt.groupIndex || !opt.groupIndex.length) return
				opt.option = generate_option(opt,colors,dt)
				// console.log('color :',JSON.stringify(colors))
				var result = dataOperationService.getTimeSeriesNameByGroupIndex(
					data,
					opt.groupIndex[0],
					opt.categoryIndex,
					opt.valueIndex[0])
			    opt.option.toolbox.feature.magicType = null
				opt.option.legend.data = result.legend
				opt.option.series = result.series
				opt.option.xAxis = getTimeAxis()
				// console.log('opt :',opt.option)
			},
			pie:(data,opt,titles,colors,dt)=>{
				if(!opt.valueIndex) return
				opt.option = generate_option(opt,colors,dt)
				opt.option.xAxis = null
				opt.option.yAxis = null
				opt.option.tooltip = {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    }
				var legendMap= {},tmpCenter

			    opt.valueIndex.forEach((v)=>{
			    	if(!legendMap[v]){
			    		legendMap[v] = true
			    		dataOperationService.getColByColIndex(data,opt.categoryIndex).forEach((l)=>{
		    				opt.option.legend.data.push(l)
			    		})
			    		// opt.option.legend.data = opt.option.legend.data.concat(dataOperationService.getColByColIndex(data,opt.categoryIndex))
			    	}
			    	tmpCenter = v.center || ['50%','50%']
			    	opt.option.series.push({
			    		name:titles[v.value],
			    		center:tmpCenter,
			    		type:v.type ? v.type:'pie',
			    		label:{
			    			normal:{
			    				formatter:(params)=>{
			    					return params.name+':'+params.value+'('+params.percent+'%)'
			    				}
			    			}
			    		},
			    		data:dataOperationService.getColByColDoubleIndex(data,v.value,opt.categoryIndex,opt.maxNum)
			    	})
			    })
			    opt.option.legend.orient = 'vertical'
			    opt.option.legend.left = '4%'
				// console.log('opt in pie :',opt.option)
			},
			group:(data,opt,titles,colors,dt)=>{
				if(!opt.groupIndex || !opt.groupIndex.length) return
				opt.option = generate_option(opt,colors,dt)
				var result = dataOperationService.getSeriesNameByGroupIndex(
					data,
					opt.groupIndex[0],
					opt.categoryIndex,
					opt.valueIndex[0],
					opt.chartStatus)
				opt.option.legend.data = result.legend
				opt.option.series = result.series
				opt.option.xAxis.data = result.category
				if(opt.chartStatus){
					opt.tableInfo = {
						titles:[titles[opt.groupIndex[0]],titles[opt.valueIndex[0].value]],
						data:[]
					}
					result.ocategory.forEach((cate,index)=>{
						opt.tableInfo.data.push([cate,result.oseries[0].data[index]])
					})
					opt.ooption = generate_option(opt,colors,dt)
					opt.ooption.legend.data = result.olegend
					opt.ooption.series = result.oseries
					opt.ooption.xAxis.data = result.ocategory
				}
			}
		},service = {
			/**
		       * @ngdoc function
		       * @methodOf content.service:dataParserService
		       * @name parseData
		       * @description 解析原始数据,生成echarts配置信息
		       * @param {Array} data 二维数据
		       * @param {Object} opt 用来存储echarts配置信息</br>
		       * 详细信息配置保存在opt.option
		       * 汇总信息配置保存在opt.ooption
		       * @param {Array} titles 原数据每一列的标题
		       * @param {Array} colors 供echarts使用颜色数组
		       * @param {String} dt 数据的请求日期
		       */
			parseData:(data,opt,titles,colors,dt)=>{
				if(!opt.type) opt.type = 'general'
				// console.log('type :',opt.type)
				return parsers[opt.type](data,opt,titles,colors,dt)
				// if(opt.type){
				// 	return parsers.general(data,opt,titles,colors)
				// }else if(opt.type == 'group'){
				// 	return parsers.group(data,opt,titles,colors)
				// }
			},
			/**
		       * @ngdoc function
		       * @methodOf content.service:dataParserService
		       * @name array2titles
		       * @description 将字符串数组转成带title属性的对象数组
		       * @param {Array} titles 字符串数组
		       * @return {Array} 带title属性的对象数组
		       */
			array2titles:(titles)=>{
				if(!titles) return []
				var arr = []
				titles.forEach((t)=>{
					arr.push({title:t})
				})
				return arr
			}
			// getColByColIndex:(index)=>{
			//     if(this.opt.data) return this.opt.data
			//     if(!index || index < 0){
			//       return []
			//     }
			//     this.opt.data = []
			//     this.data.forEach((v)=>{
			//       this.opt.data.push(v[index])
			//     })
			//     return this.opt.data
		 //  	}
		}

		return service
	}
]