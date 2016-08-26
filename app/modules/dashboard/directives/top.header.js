'use strict';
module.exports = [
() => {
  return{
    restrict: 'E',
    replace: true,
    scope:{
    },
    templateUrl: 'modules/dashboard/views/top.header.html',
    link: (scope, el, attrs, ctrl) => {
      
      var a = document.documentElement

      scope.flgs = {
        showflg : true,
        spinned : true,
        fullflg : false 
      }


      var isSpined = ()=>{
        return scope.flgs.spinned
      }

      scope.hide = ()=>{
        if(isSpined()) return
        scope.flgs.showflg = false
      }
      scope.show = ()=>{
        if(isSpined()) return
        scope.flgs.showflg = true
      }
      scope.spin = ()=>{
        scope.flgs.spinned = !scope.flgs.spinned
      }

      scope.fullscreen = ()=>{
        if(scope.flgs.fullFlg){
          scope.flgs.fullFlg = false
          document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen();
        }else{
          scope.flgs.fullFlg = true
          console.log('true')
          a.requestFullscreen ? a.requestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen ? a.webkitRequestFullscreen() : a.msRequestFullscreen && a.msRequestFullscreen();
          
        }

      }

    }
  }

}]