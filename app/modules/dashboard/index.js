// Generated by CoffeeScript 1.7.1
"use strict"
module.exports = angular.module("dashboard", []).config([
  "$stateProvider", "$urlRouterProvider",($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.when("/dashboard", "/dashboard/data")
    $stateProvider.state("dashboard", {
      url: "/dashboard",
      templateUrl: "modules/dashboard/views/dashboard.html",
      controller:'dashBoardCtrl',
      params:{
        animateId:'body',
        apps:[]
      }
    })
    .state("dashboard.data", {
      url: "/data",
      views:{
        'func':{
           controller:'dataCtrl',
           templateUrl: "modules/dashboard/views/data.html"
        }
      }
    })
    // .state("dashboard.data.content1",{
    //   url:"/content",
    //   views:{
    //     'content':{
    //       controller:'mainContentCtrl',
    //       templateUrl: "modules/dashboard/views/main.content.html"
    //     }
    //   },
    //   params:{
    //     param:null 
    //   }
    // })
    // .state("dashboard.data.content2",{
    //   url:"/content2",
    //   views:{
    //     'content':{
    //       controller:'mainContentCtrl',
    //       templateUrl: "modules/dashboard/views/main.content.html"
    //     }
    //   },
    //   params:{
    //     param:null 
    //   }
    // })
  } 
])
.constant('menuMock',require('./menu.mock')) 
.constant('manageMock',require('./manage.mock'))
.constant('manageRoot',require('./manage.root'))
.directive('topHeader', require('./directives/top.header'))
/**
 * @ngdoc directive
 * @name dashboard.directive:contentMenu
 * @restrict E
 * @description
 * 数据图表页的左边导航栏
 * @requires common.service:MemoryCache
 * @requires common.service:Memorykey
 * @requires dashboard.service:dashboardService
 */
.directive('contentMenu', require('./directives/content.menu'))
.directive('asideMenu', require('./directives/aside.menu'))
/**
 * @ngdoc directive
 * @name dashboard.directive:asidePath
 * @restrict E
 * @description
 * 数据区右边滑进滑出的导航条
 * @requires dashboard.service:scrollAnimate
 * @requires dashboard.service:ScrollService
 */
.directive('asidePath', require('./directives/aside.path')) 
/**
 * @ngdoc directive
 * @name dashboard.directive:mainHeader
 * @restrict E
 * @description
 * 顶部导航
 */
.directive('mainHeader', require('./directives/main.header'))
.directive('finishRender', require('./directives/finish.render'))
.directive('contentWrapper', require('./directives/content.wrapper')) 
/**
 * @ngdoc directive
 * @name dashboard.directive:echart
 * @restrict E
 * @description
 * 通过echart绘制图
 */
.directive('echart', require('./directives/charts/echart')) 
/**
 * @ngdoc directive
 * @name dashboard.directive:echartContainer
 * @restrict E
 * @description
 * 图表tab页,绘制多个图表
 *
 * @param {Array} ngModel 后台请求过来的原始数据
 */
.directive('echartContainer', require('./directives/charts/echart.container')) 
.directive('realtimeContainer', require('./directives/charts/realtime.container'))
/**
 * @ngdoc directive
 * @name dashboard.directive:datatable
 * @restrict E
 * @description
 * 封装了datatables,实现了改变数据,就能改变table
 * @param {Array} ngModel 后台请求过来的原始数据
 */ 
.directive('datatable', require('./directives/tables/datatable')) 
.directive('colortable', require('./directives/tables/color.table')) 
/**
 * @ngdoc directive
 * @name dashboard.directive:datatableContainer
 * @restrict E
 * @description
 * 根据参数可以产生不同风格的table
 */   
.directive('datatableContainer', require('./directives/tables/datatable.container'))
/**
 * @ngdoc directive
 * @name dashboard.directive:datePicker
 * @restrict E
 * @description
 * 时间选择器,支持选单个时间和时间范围
 *
 * @param {String} type (@)单个时间还是时间范围(single:单个时间,其他值都是时间范围)
 * @param {String} data (=)保存当前选择的时间值
 * @param {String=} fmt (@)时间显示的格式
 * @param {Number=} startDay (@)默认去距离今天的第startDay天
 * @param {Boolean} noLoad (@)是否立即触发loadContentdata
 * @param {Function} loadContentdata (&)改变时间值触发的回调
 */  
.directive('datePicker', require('./directives/date.picker'))
.directive('dateSelect', require('./directives/date.select'))
.directive('treeView', require('./directives/tree.view'))   
.directive('refreshButton', require('./directives/refresh.button'))
/**
 * @ngdoc directive
 * @name dashboard.directive:contentTreeview
 * @restrict E
 * @description
 * 数据图表页左边菜单组件
 *
 * @param {Object} ngModel 后台请求过来的菜单数据
 */      
.directive('contentTreeview', require('./directives/content.treeview'))  
.directive('scroll', require('./directives/scroll'))     
.factory('scrollAnimate',require('./services/scroll.animate'))  
/**
 * @ngdoc service
 * @name dashboard.service:dashboardService
 * @description
 * dashboad服务类
 */
.factory('dashboardService',require('./services/dashboard.service'))  
/**
 * @ngdoc service
 * @name dashboard.service:ScrollService
 * @description
 * 组件滚动服务
 */
.factory('ScrollService',require('./services/scroll.service'))  
/**
 * @ngdoc controller
 * @name dashboard.controller:dashBoardCtrl
 * @description
 * /dashboard路径对应的控制器,监听changeCurApp事件
 * @requires common.service:MobileService
 * @requires common.service:Notification
 * @requires dashboard.service:dashboardService
 * @property {Object} user 登录的用户信息
 * @property {Array} appList 用户能访问的应用列表
 * @property {Object} curApp 用户当前访问的应用
 */
.controller('dashBoardCtrl', require('./controllers/dashboard'))

.controller('mainContentCtrl', require('./controllers/main.content'))
/**
 * @ngdoc controller
 * @name dashboard.controller:dataCtrl
 * @description
 * /dashboard/data路径对应的控制器
 * @requires dashboard.service:dashboardService
 * @property {Object} menutree 左边菜单树需要的菜单数据
 */
.controller('dataCtrl', require('./controllers/data'))
.controller('changePasswordCtrl', require('./controllers/change.password'))
.filter('menuFilter',require('./filters/menu.filter'))
.filter('toJson',require('./filters/to.json'))
// .run(['mePageLoading',
// (mePageLoading)=>{
//   mePageLoading.registerAnimater()
// }])
// .constant('customerMock',require('./customer.mock'))
// .directive('faceLook', require('./directives/face.look')) 
// .directive('finishrender', require('./directives/finish.render'))
// .factory('ChatService', require('./services/chat.service'))
// .controller('recentChatListCtrl', require('./controllers/recentChat.list'))
