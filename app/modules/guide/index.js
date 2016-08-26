/**
 * Created by huang.qinghua on 2016/8/16.
 */
"use strict"
module.exports = angular.module("guide", []).config([
        "$stateProvider", "$urlRouterProvider", ($stateProvider, $urlRouterProvider) => {
        $stateProvider.state("dashboard.guide", {
            url: "/guide",
            views:{
                'func':{
                    controller:'GuideCtrl',
                    templateUrl: "modules/guide/views/guide.html",
                }
            }
        })

        }
])
.controller('GuideCtrl', require('./controllers/guide'))
