'use strict';
module.exports = ['$rootScope','scrollAnimate','$timeout','ScrollService',
($rootScope,scrollAnimate,$timeout,ScrollService) => {
  return{
    restrict: 'E',
    replace: true,
    // scope:{
    // },
    templateUrl: 'modules/dashboard/views/aside.path.html',
    compile:(tEl, tAttrs)=>{ 


      return  (scope, el, attrs, ctrl) => {
        var $tar = el.parent('.main-content'),
        $body = $('body')
        ,diff = 0

        /**
         * @ngdoc function
         * @methodOf dashboard.directive:asidePath
         * @name choosePath
         * @description 选取目标数据区，并平滑滚到目标数据区
         * @param {Object} path 选取的数据区
         * @param {Number} i 序号
         * @param {Object} paths 所有数据区
         */
        scope.choosePath = (path,i,paths)=>{
          var maxScroll = $(document).height() - $(window).height(),
          diff
          if(i == 0){
            $body.scrollTop(0)
            diff = 0
          }else if(i == paths.length-1){
            $body.scrollTop(maxScroll)
            diff = maxScroll
          }else{
            diff = window.scrollY
          }
          // console.log('scroll :',windowScroll.scroll)
          var $tarEl = $('#'+path.id),
          elTop = $tarEl[0].offsetTop-56-diff, //-106
          curTop = $tar.scrollTop()
          // console.log('diff :',diff)

          scrollAnimate.start(elTop-curTop,50,(d)=>{
            $tar.scrollTop(d+curTop)
          })
          
          // $('body').scrollTop($tarEl.offset().top-106)
          // window.scrollTo(0,$tarEl.offset().top-106)
          // $rootScope.$broadcast('scroll',document.getElementById(path.id))
        }
        // console.log('window :',window)
        // window.onscroll = ($event)=>{
        //   console.log('scroll :',scroll) 
        //   console.log('bottom :',$(document).height() - $(window).height())
        // }
        scope.$on('scroll-reborn',()=>{
          $body.scrollTop(0)
          $tar.scrollTop(0)
        })
      }
    }
    
  }

}]