// Generated by CoffeeScript 1.7.1
"use strict";
module.exports = angular
.module("common", [])  
.directive('standTable',require('./directives/stand.table'))
.directive('generalTable',require('./directives/general.table'))

.directive('standTree',require('./directives/stand.tree'))
/**
 * @ngdoc directive
 * @name common.directive:ichecker
 * @restrict E
 * @description
 * checkbox组件
 * @scope
 * @param {Boolean} iModel (=)是否选中
 * @param {string} iText (@)标签
 * 
 */
.directive('ichecker',require('./directives/ichecker')) 
/**
 * @ngdoc directive
 * @name common.directive:iswitch
 * @restrict E
 * @description
 * 开关组件
 * @scope
 * @param {string} ontext (@)开标签
 * @param {string} offtext (@)关标签
 * @param {Boolean} flag (=)开关状态
 * @param {Function} onChange (&)开关状态变化监听函数,参数为flag
 */
.directive('iswitch',require('./directives/iswitch')) 
/**
 * @ngdoc directive
 * @name common.directive:msgTip
 * @restrict E
 * @description
 * @scope
 * 页面右上角消息通知组件,绑定了Notification服务的msg,整个应用只需要一个

 */
.directive('msgTip',require('./directives/msg.tip')) 
.directive('loading',require('./directives/loading')) 
/**
 * @ngdoc directive
 * @name common.directive:whaleySelect
 * @restrict E
 * @description
 * 下拉组件
 * @scope
 * @param {Function} getData (&) 获取下拉列表数据
 * @param {Object} selectItem (=)当前选中项
 * @param {Function} loadData (&)改变选中项的时候触发的回调
 */
.directive('whaleySelect',require('./directives/whaley.select')) 
/**
 * @ngdoc directive
 * @name common.directive:filterSelect
 * @restrict E
 * @description
 * 级联下拉子组件
 * @scope
 * @param {Array} data (=) 下拉列表数据
 * @param {Object} selectItem (=)当前选中项
 * @param {Object} parentItem (=)父下拉组件的当前选中项
 * @param {string} text (@)默认选中项的标签
 * @param {Number} level (@) 标识位于级联组件中的等级
 * @param {Function} loadData (&)改变选中项的时候触发的回调
 */
.directive('filterSelect',require('./directives/filter.select')) 
/**
 * @ngdoc directive
 * @name common.directive:filterGroup
 * @restrict E
 * @description
 * 级联下拉组件,包含多个filterSelect
 * @scope
 * @param {Object} data (=) data.data(Array)，其中每个元素生成一个filterSelect</br>
 * data.param(string) 所选内容保存到config[data.param]
 * @param {Object} config (=)保存所选内容
 * @param {Function} loadContentdata (&)最后一个filterSelect改变选项时触发的回调
 */
.directive('filterGroup',require('./directives/filter.group')) 
/**
 * @ngdoc directive
 * @name common.directive:ajaxSelect
 * @restrict E
 * @description
 * 动态下拉组件，根据url请求下拉数据
 * @scope
 * @param {string} url (@)数据请求url
 * @param {Object=} urlBody (@)请求参数
 * @param {string} paramName  (@)要赋值的参数名
 * @param {Object} config (=)用户选取下拉选项后，把选中项的值赋给paramName指定的config属性
 * @param {string} id (@)组件ID
 * @param {Boolean} autoLoad (@)数据请求过来是否触发loadData回调
 * @param {Function} loadData (&)改变选中项的时候触发的回调
 */
.directive('ajaxSelect',require('./directives/ajax.select'))
/**
 * @ngdoc directive
 * @name common.directive:checkboxSelect
 * @restrict E
 * @description
 * 带checkbox的下拉组件，并支持查询功能,确认按钮表示确定确定选中项</br>
 * 监听事件changeOptionList(event,data),并用data更新下拉列表，默认全部选中</br>
 * 点击确认按钮,发送refreshChart事件来更新图表
 * 
 * @scope
 * @param {string} selectId (@)组件ID
 * @param {string} label (@)组件标签
 */
.directive('checkboxSelect',require('./directives/checkbox.select')) 
/**
 * @ngdoc directive
 * @name common.directive:searchButton
 * @restrict E
 * @description
 * 查询框组件
 * 
 * @scope
 * @param {Object} data (=)组件选项（width,tip，param） width:组件宽度 tip:输入框的placeholder param:制定config的属性名
 * @param {Function} loadContentdata  (&)点击搜索按钮触发的回调函数,会将搜索条件保存到config[data.param]中
 * @param {Object} config (=) 用来保存输入内容
 */
.directive('searchButton',require('./directives/search.button')) 
.directive('liziBg',require('./directives/lizi.bg')) 
/**
 * @ngdoc directive
 * @name common.directive:collapsePanel
 * @restrict E
 * @description
 * 多折叠panel组件
 * 
 * @scope
 * @param {Array} data (=)数组里的每个元素对应到每个panel里面的内容
 */
.directive('collapsePanel',require('./directives/collapse.panel')) 
/**
 * @ngdoc directive
 * @name common.directive:msgPanel
 * @restrict E
 * @description
 * 错误crash日志的右下角信息提示面板</br>
 * 监听showCrashError</br>
 * 每次进入应用，如果有错误crash日志，这个面板就会在右下角显示
 */
.directive('msgPanel',require('./directives/msg.panel')) 
.directive('horseRise',require('./directives/horse.rise')) 
.controller('confirmCtrl',require('./controllers/confirm'))
/**
 * @ngdoc service
 * @name common.service:Notification
 * @description
 * 通知服务
 */
.factory('Notification', require('./services/notification'))

.factory('LoadingService', require('./services/loading'))
/**
 * @ngdoc service
 * @name common.service:MobileService
 * @requires Restangular
 * @requires config.service:ServerCurrent
 * @requires common.service:Notification
 * @description
 * 数据请求服务
 */
.factory('MobileService', require('./services/mobile.service'))
/**
 * @ngdoc service
 * @name common.service:MemoryCache
 * @description
 * 封装了浏览器的sessionStorage,实现会话存储功能
 */
.factory('MemoryCache', require('./services/memory.cache'))
.factory('filterService', require('./services/filter.service'))
.factory('Storage', require('./services/storage'))
.factory('liziService', require('./services/lizi.service'))
.filter('to_trusted', ['$sce', ($sce) => {
	return (text) => {
    	return $sce.trustAsHtml(text);
	}
}])
/**
 * @ngdoc filter
 * @name common.filter:valueFilter
 * @description
 * 对象的name属性需要包含输入的字符串
 * @param {Array} input 对象数组
 * @param {string} search 过滤条件
 */
.filter('valueFilter', [() => {
	return (input,search) => {
        if(!search) return input
    	var arr = []
    	if(!input) return arr
    	input.forEach((item)=>{
    		if(item.name.indexOf(search) >= 0){
    			arr.push(item)
    		}
    	})
    	return arr
	}
}])
.filter('optionFilter', require('./filters/option.filter'))
.filter('versionFilter', require('./filters/version.filter'))
.constant('selectMock',require('./select.mock'))
  // .factory('AnimaterService',require('./services/animater.service'))