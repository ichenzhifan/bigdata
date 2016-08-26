'use strict';
module.exports = ['$timeout','MobileService','$uibModal','Notification','$rootScope','crashResource',
($timeout,MobileService,$uibModal,Notification,$rootScope,crashResource) => {
  return{
    restrict: 'E',
    replace: true,
    templateUrl: 'modules/dashboard/views/main.header.html',
    link: (scope, el, attrs, ctrl) => {

      var a = document.documentElement
      ,$window = $(window)

      scope.flgs = {
        fullflg : false
        // showflg : false
      }

      scope.msgList = []
      // crashResource.crashReminder().then((resp)=>{
      //   scope.msgList = resp.data
      //   scope.showCrashMsg()
      // })

      scope.fullscreen = ()=>{
        if(scope.flgs.fullFlg){
          scope.flgs.fullFlg = false
          document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen();
        }else{
          scope.flgs.fullFlg = true
          a.requestFullscreen ? a.requestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen ? a.webkitRequestFullscreen() : a.msRequestFullscreen && a.msRequestFullscreen();
          
        }

      }
      scope.showPath = ()=>{
        // console.log('showPath')
        // scope.flgs.showflg = !scope.flgs.showflg
      }

      scope.sighOut = ()=>{
        var sighOutModalInstance = $uibModal.open({
          templateUrl: 'modules/login/views/sign.out.html',
          controller: 'signOutCtrl',
          openedClass:'scrollbd',
          // backdrop: 'static',
          resolve: {
          }
        })
        sighOutModalInstance.result.then(function () {
          MobileService.signOut()
        });
        
      }

      scope.choosePassword = ()=>{
         var changeWordModalInstance = $uibModal.open({
          templateUrl: 'modules/login/views/edit.password.html',
          controller: 'changePasswordCtrl',
          openedClass:'scrollbd',
          // backdrop: 'static',
          resolve: {
            user:()=>{
              return scope.user
            }
          }
        })
        // changeWordModalInstance.result.then(function () {
        //   MobileService.signOut()
        // });
      }

      scope.showCrashMsg  = ()=>{
        $rootScope.$broadcast('showCrashError',scope.msgList)
      }

      scope.asidespin = ($event)=>{
        scope.asidemenu.spinned = !scope.asidemenu.spinned
        $rootScope.$broadcast('resize')
        $event.preventDefault()
        $event.stopPropagation()
      }
      // $window.scroll(($event)=>{
      //     var scrollTop  = $window.scrollTop()
      //     if(scrollTop >= 0){
      //       el.css('transform','translate(0px,'+scrollTop+'px)')
      //     }
      //   })
    }
  }

}]