'use strict';
module.exports = ['$timeout','scrollAnimate',
($timeout,scrollAnimate) => {
  return{
    restrict: 'E',
    replace: true,
    // scope:{
    // },
    controller:'loginCtrl',
    templateUrl: "modules/login/views/bg.changer.html",
    compile:(tEl, tAttrs)=>{
      return  (scope, el, attrs, ctrl) => {
        var prevflg = false,curflg = true,destroyFlg = false
        ,getNextIndex = (i)=>{
            if(i >= 3){
                return 1
            }
            return i+1
        }
        ,prev =  Math.floor(Math.random()*3)+1
        ,cur = getNextIndex(prev)
        ,$prev = el.find('#firstBg')
        ,$cur = el.find('#twoBg')
        ,getClassName = (index,flg)=>{
            var str = flg ? 'whaley-abs-full-element bg-changer fadeIn bg' : 'whaley-abs-full-element bg-changer  fadeOut bg'
            return str+index
        }
        var changeBg = ()=>{
            $cur.attr('class',getClassName(prev,prevflg))
            $prev.attr('class',getClassName(cur,curflg))
            prevflg = !prevflg
            curflg = !curflg
            if(prevflg){
                prev = getNextIndex(cur)
            }
            if(curflg){
                cur = getNextIndex(prev)
            }
            setTimeout(()=>{
                changeBg()
            },5000)
        }

        // $timeout(()=>{
        changeBg()
        // },2000)



       
        scope.$on('$destroy',()=>{
          destroyFlg = true
        })
      }

    }
    
  }

}]