'use strict';
module.exports = [
()=>{
	// var diguiTree = (treeData)=>{
	// 	if(!treeData) return
	// 	treeData.forEach((t)=>{
	// 		t.selectCount = 0
	// 		if(!t.nodes) return 
	// 		t.nodes.forEach((tnode)=>{
	// 			t.selectCount += tnode.own ? 1 : 0
	// 			tnode.parentNode = t
	// 		})
	// 		diguiTree(t.nodes)
	// 	})
	// 	return treeData
	// },relation = (treeData,level)=>{
	// 	if(!treeData) return
	// 	treeData.forEach((t,i)=>{
	// 		if(level == 0){
	// 			t.root = treeData
	// 		}
	// 		if(!t.nodes) return 
	// 		t.nodes.forEach((tnode)=>{
	// 			tnode.parentNode = t
	// 		})
	// 		diguiTree(t.nodes)
	// 	})
	// 	return treeData
	// }
	var diguiTree = (treeData)=>{
		treeData.selectCount = 0
		if(!treeData.nodes) return
		treeData.maxCount = treeData.nodes.length
		treeData.nodes.forEach((node)=>{
			treeData.selectCount += node.own ? 1 : 0
			node.parentNode = treeData
			diguiTree(node)
		})
		return treeData
	}
	,relation = (treeData)=>{
		if(!treeData || !treeData.nodes) return
		treeData.nodes.forEach((node)=>{
			node.parentNode = treeData
			relation(node)
		})
		return treeData
	},unwrapper = (treeData)=>{
		if(!treeData || !treeData.nodes) return
		treeData.parentNode = null
		treeData.nodes.forEach((node)=>{
			unwrapper(node)
		})
	},service = {
        wrapperTree:(treeData) => {
        	var root = {title:'全选',nodes:treeData,own:0}
        	,tmpTree = diguiTree(root)
        	// console.log('treeData :',treeData)
        	return [tmpTree]
        	// return diguiTree([{title:'全选',nodes:treeData}])
        },
        unwrapperTree:(treeData)=> {
        	unwrapper(treeData)
        },
        relationTree:(treeData) =>{
        	return [relation({title:'root',nodes:treeData})]
        },
        getTplByType:(type)=>{
        	if(!type || type == 'remark'){
        		return [
				  {
				    "name(手指导航里的列表项)": "name_xxxx",
				    "id": "id_xxxx",
				    "type(前端模板类型)": "general",
				    "param": {
				      "config": {
				        "sqlUri": "medusa.newVersionStatistics.UserTrendMapper.queryUserTrend"
				      },
				      "datepicker(时间选择器)": {
				        "type(类型:single|custom)": "custom",
				        "noload(第一次加载后是否请求数据,有值就不加载)":1
				      },
				       "tip(图标说明)": {
				        "title": "这是标题。。。。。",
				        "items": [
				          {
				            "title": "变化率",
				            "content": "时间按活动卡刷卡费里哈斯卡付好款发顺丰按客户方"
				          },
				          {
				            "title": "变化率1",
				            "content": "时间按活动卡刷卡费里哈斯卡付好款发顺丰按客户方"
				          },
				          {
				            "title": "变化率2",
				            "content": "时间按活动卡刷卡费里哈斯卡付好款发顺丰按客户方"
				          }
				        ]
				      },
				      "search(图表右上角的搜索框)":{  
				      	"param(对应请求参数的字段名)":"param_xxx",  
				      	"tip(查询输入框的placeholder)":"请选择"  
				      },
				      "table": {
				        "titles(表格表头名)": [ 
				          "title_xxx",   
				          "title_xxx",
				          "title_xxx",
				          "title_xxx"
				        ]
				      },
				      "filters(图表右上角下拉框)": [
				        {
				          "param(对应请求参数名)": "productModel",
				          "enableUri(每个选项可更改数据uri)" : "",
				          "data": [
				            {
				              "text": "请选择",
				              "list(下拉选项,id name value 都不可少)": [
				                {
				                  "id": "1",
				                  "name": "name_xxx",
				                  "uri" : "uri_xxx",
				                  "value": "value_xxx"
				                },
				                {
				                  "id": "2",
				                  "name": "name_xxx",
				                  "uri" : "uri_xxx",
				                  "value": "value_xxx"
				                }
				              ]
				            }
				          ]
				        }
				        ,{
							"param(级联下拉,对应请求参数名)": "abcd",
							"data":[
								{
									text:'请选择省份',
									list:[
										{id:1,name:'湖南省',value:'a'},
										{id:2,name:'四川省',value:'b'},
										{id:3,name:'湖北省',value:'c'},
										{id:4,name:'江西省',value:'d'}
									]
								},{
									text:'请选择城市',
									list:[
										{id:11,name:'aaa',value:'aaa',pid:1},
										{id:12,name:'bbb',value:'bbb',pid:1},
										{id:13,name:'ccc',value:'ccc',pid:2},
										{id:14,name:'ddd',value:'ddd',pid:2},
										{id:15,name:'eee',value:'eee',pid:3},
										{id:16,name:'fff',value:'fff',pid:3},
										{id:17,name:'ggg',value:'ggg',pid:4},
										{id:18,name:'hhh',value:'hhh',pid:4}
									]
								},{
									text:'请选择地区',
									list:[
										{id:111,name:'aaaa',value:'aaaa',pid:11},
										{id:112,name:'bbba',value:'bbbb',pid:11},
										{id:121,name:'cccc',value:'cccc',pid:12},
										{id:122,name:'dddd',value:'dddd',pid:12},
										{id:131,name:'eeee',value:'eeee',pid:13},
										{id:132,name:'ffff',value:'ffff',pid:13},
										{id:141,name:'gggg',value:'gggg',pid:14},
										{id:142,name:'hhhh',value:'hhhh',pid:14},

										{id:151,name:'iiii',value:'iiii',pid:15},
										{id:152,name:'jjjj',value:'jjjj',pid:15},
										{id:161,name:'kkkk',value:'kkkk',pid:16},
										{id:162,name:'llll',value:'llll',pid:16},
										{id:171,name:'mmmm',value:'mmmm',pid:17},
										{id:172,name:'oooo',value:'oooo',pid:17},
										{id:181,name:'pppp',value:'pppp',pid:18},
										{id:182,name:'qqqq',value:'qqqq',pid:18},
									]
								}
							]
						}
				      ],
				      "searchfilters(带搜索的下拉框)": [
				        {
				          "param": "ChannelModel",
				          "url(请求URL)": "/medusa/common/getFilterData",
				          "autoLoad(是否立即加载,有值就加载，没值就不加载)":0,
				          "body(请求参数)": {
				            "param": {
				              "uri": "medusa.filterInfo.ChannelInfo.QueryPromotionChannelInfo"
				            }
				          }
				        }
				      ],
				      "charts(表格标签页)": [
				        {
				          "name(标签名)": "name_xxx",
				          "categoryIndex(表格X轴取表格的某一列数据)": 0,
				          "valueIndex(对应表格的series)": [
				            {
				              "type": "line",
				              "value": 1
				            }
				          ],
				          "chartStatus":{
				          	"status(汇总|趋势)":"true|false"
				          },
				          "unvisible(图是否可见)":true,
				          "title(图表名)": "title_xxx"
				        },
				        {
				          "name(标签名)": "name_xxx",
				          "type(数据解析器类型)":"group",
				          "groupIndex(根据某列划分组别)":[1],
				          "categoryIndex": 0,
				          "valueIndex": [
				            {
				              "type": "line",
				              "value": 1
				            }
				          ],
				          "title": "title_xxx"
				        },
				        {
				          "name(标签名)": "name_xxx",
				          "type(数据解析器类型)":"pie",
				          "categoryIndex": 0,
				          "valueIndex": [
				            {
				              "type": "pie",
				              "center(图表位置)": [
				                "27%(x轴)",
				                "50%(y轴)"
				              ],
				              "value": 2
				            },
				            {
				              "type": "pie",
				              "center(图表位置)": [
				                "75%",
				                "50%"
				              ],
				              "value": 3
				            }
				          ],
				          "title": "title_xxx"
				        }
				      ]
				    }
				  }
				]
        	}else if(type == 'base'){
        		return [
				  {
				    "name": "name_xxxx",
				    "id": "id_xxxx",
				    "type": "general",
				    "param": {
				      "config": {
				        "sqlUri": "medusa.newVersionStatistics.UserTrendMapper.queryUserTrend"
				      },
				      "datepicker": {
				        "type": "custom",
				        "noload":1
				      },
				      "search":{  
				      	"param":"param_xxx",  
				      	"tip":"请选择"  
				      },
				      "table": {
				        "titles": [ 
				          "title_xxx",   
				          "title_xxx",
				          "title_xxx",
				          "title_xxx"
				        ]
				      },
				      "filters": [
				        {
				          "param": "productModel",
				          "data": [
				            {
				              "text": "请选择",
				              "list": [
				                {
				                  "id": "1",
				                  "name": "name_xxx",
				                  "value": "value_xxx"
				                },
				                {
				                  "id": "2",
				                  "name": "name_xxx",
				                  "value": "value_xxx"
				                }
				              ]
				            }
				          ]
				        }
				        ,{
							"param": "abcd",
							"data":[
								{
									text:'请选择省份',
									list:[
										{id:1,name:'湖南省',value:'a'},
										{id:2,name:'四川省',value:'b'},
										{id:3,name:'湖北省',value:'c'},
										{id:4,name:'江西省',value:'d'}
									]
								},{
									text:'请选择城市',
									list:[
										{id:11,name:'aaa',value:'aaa',pid:1},
										{id:12,name:'bbb',value:'bbb',pid:1},
										{id:13,name:'ccc',value:'ccc',pid:2},
										{id:14,name:'ddd',value:'ddd',pid:2},
										{id:15,name:'eee',value:'eee',pid:3},
										{id:16,name:'fff',value:'fff',pid:3},
										{id:17,name:'ggg',value:'ggg',pid:4},
										{id:18,name:'hhh',value:'hhh',pid:4}
									]
								},{
									text:'请选择地区',
									list:[
										{id:111,name:'aaaa',value:'aaaa',pid:11},
										{id:112,name:'bbba',value:'bbbb',pid:11},
										{id:121,name:'cccc',value:'cccc',pid:12},
										{id:122,name:'dddd',value:'dddd',pid:12},
										{id:131,name:'eeee',value:'eeee',pid:13},
										{id:132,name:'ffff',value:'ffff',pid:13},
										{id:141,name:'gggg',value:'gggg',pid:14},
										{id:142,name:'hhhh',value:'hhhh',pid:14},

										{id:151,name:'iiii',value:'iiii',pid:15},
										{id:152,name:'jjjj',value:'jjjj',pid:15},
										{id:161,name:'kkkk',value:'kkkk',pid:16},
										{id:162,name:'llll',value:'llll',pid:16},
										{id:171,name:'mmmm',value:'mmmm',pid:17},
										{id:172,name:'oooo',value:'oooo',pid:17},
										{id:181,name:'pppp',value:'pppp',pid:18},
										{id:182,name:'qqqq',value:'qqqq',pid:18},
									]
								}
							]
						}
				      ],
				      "charts": [
				        {
				          "name": "name_xxx",
				          "categoryIndex": 0,
				          "valueIndex": [
				            {
				              "type": "line",
				              "value": 1
				            }
				          ],
				          "title": "title_xxx"
				        },
				        {
				          "name": "name_xxx",
				          "type":"group",
				          "groupIndex":[1],
				          "categoryIndex": 0,
				          "valueIndex": [
				            {
				              "type": "line",
				              "value": 1
				            }
				          ],
				          "title": "title_xxx"
				        },
				        {
				          "name": "name_xxx",
				          "type":"pie",
				          "categoryIndex": 0,
				          "valueIndex": [
				            {
				              "type": "pie",
				              "center": [
				                "27%",
				                "50%"
				              ],
				              "value": 2
				            },
				            {
				              "type": "pie",
				              "center": [
				                "75%",
				                "50%"
				              ],
				              "value": 3
				            }
				          ],
				          "title": "title_xxx"
				        }
				      ]
				    }
				  }
				]
        	}
        }
	} 
	return service
}]