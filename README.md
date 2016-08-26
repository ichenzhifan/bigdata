# 知识1:
1. ECMAScript6
  1. [Coffee vs ES6](https://robots.thoughtbot.com/replace-coffeescript-with-es6)
  * [ES6速览](http://www.cnblogs.com/hustskyking/p/ecmascript6-overview.html)
  * [ES6书](http://es6.ruanyifeng.com/#docs/class)
*  Angular.js
  1. [官方网站](https://angularjs.org)
  * [w3school](http://www.w3schools.com/angular/)
  * [中文社区](http://www.angularjs.cn/)
  * [Restangular](https://github.com/mgonto/restangular)
  * [Angular-strap](https://github.com/mgcrea/angular-strap)
*  [lodash](https://lodash.com/docs)
*  [thenjs](https://github.com/teambition/then.js)
*  less
  1. http://lesscss.org/
  2. http://css2less.cc/
*  Bootstrap
  1. http://bootswatch.com/flatly/#tables
  *  http://getbootstrap.com/
*  jade
  1. http://jade-lang.com
  * http://html2jade.org/
*  gulp
  1. http://gulpjs.com/
  2. http://www.gulpjs.com.cn/ 

# 环境准备
1. [node.js](nodejs.org)
  1. Mac:   https://nodejs.org/dist/v0.10.36/node-v0.10.36-darwin-x64.tar.gz
  2. Linux: https://nodejs.org/dist/v0.10.36/node-v0.10.36-linux-x64.tar.gz
  3. nvm: https://github.com/creationix/nvm 
*  npm install -g grunt-cli bower jade less
*  npm install gulp -g
*  npm install
*  bower install
  1. angular version > 1.4.8

# 工具准备
1. Sublime text 3
2. 插件安装 http://www.cnsecer.com/460.html

# Run
`gulp server`

# Test
`gulp test`
测试报告在 jasmine-runhner.html

# 生成Api文档 在doc目录
`gulp doc`


# 启动Api服务器
`gulp connect_ngdocs`



# 注意
请安装版本为4.0以上的node.js

# 部署
总共有四个部署脚本,如下
## deploy.helios.sh
helios生产环境部署,部署方法
`sh deploy.helios.sh`
## deploy.medusa.sh
medusa生产环境部署,部署方法
`sh deploy.medusa.sh`
## deploy.testhelios.sh
helios测试环境部署,部署方法
`sh deploy.testhelios.sh`
## deploy.testmedusa.sh
medusa测试环境部署,部署方法
`sh deploy.testhelios.sh`
