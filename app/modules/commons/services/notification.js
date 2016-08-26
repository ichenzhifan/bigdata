"use strict"
module.exports = [
  '$rootScope',
  ($rootScope) => {
    var message = {
      valid:false
    },service = {
      /**
       * @ngdoc function
       * @methodOf common.service:Notification
       * @name getMessage
       * @description 获取通知
       * @return {string} 通知信息
       * 
       */
      getMessage:()=>{
        return message
      },
      /**
       * @ngdoc function
       * @methodOf common.service:Notification
       * @name success
       * @description 发送成功信息，右上角弹出成功信息
       * @param {string} msg 消息
       * @param {string} interval 消息展示的时间，单位(毫秒)
       */
      success:(msg,interval)=>{
        message.msg = msg
        message.clz = 'ok'
        message.interval = interval
        message.valid = true
      },
      /**
       * @ngdoc function
       * @methodOf common.service:Notification
       * @name error
       * @description 发送失败信息，右上角弹出失败信息
       * @param {string} msg 消息
       * @param {string} interval 消息展示的时间，单位(毫秒)
       */
      error:(msg,interval)=>{
        message.msg = msg || '网络异常',
        message.clz = 'error'
        message.interval = interval
        message.valid = true
      }
    }
    return service
  }
]
  