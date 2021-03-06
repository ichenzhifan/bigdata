// Generated by CoffeeScript 1.7.1
'use strict';
module.exports = () => {
  return {
    restrict: 'E',  
    replace:true,
    transclude: true,  
    template: '<div ng-transclude>',
    compile:(tEle, tAttrs, transcludeFn) => {
      return (scope, element, attrs) => {
        element.mCustomScrollbar({
          theme:"minimal-dark"
        })


        scope.$on('scroll',($event,type)=>{
          element.mCustomScrollbar("scrollTo",type,{
              scrollInertia:500
              // scrollEasing:'easeInOut'
          })
        })

        scope.$on('scroll-reborn',()=>{
            element.mCustomScrollbar("destroy").mCustomScrollbar({
              theme:"minimal-dark"
            })
        })



        scope.$on('$destroy',()=>{
          element.mCustomScrollbar("destroy")
        })
      }
    }
  }
}
