'use strict';
module.exports = ['$rootScope',
($rootScope) => {
  return{
    restrict: 'E',
    replace: true,
    scope:{
        data:'=',
        selectFlg:'@',
        modifyFlg:'@',
        nodeOprs:'&',
        rootOprs:'&',
        operation:'&'
    },
    templateUrl: 'modules/commons/views/stand.tree.html',
    link:(scope, el, attrs,ngModelCtrl) => {
        // var calculate = (arr)=>{
        //     if(!arr) return 0
        //     var height = 0,base
        //     arr.forEach((e)=>{
        //         e.height = calculate(e.nodes)
        //         height += e.height+33
        //     })
        //     return height
        // }
        // scope.data.forEach((node)=>{
        //     node.height = calculate(node.nodes)
        // })
        // console.log('data :',scope.data)
        // scope.chooseAll = false
        // scope.chooseAllNode = ($event)=>{
        //     scope.chooseAll = ! scope.chooseAll
        //     scope.data.forEach((node)=>{
        //         scope.chooseNode(node)
        //     })
        // }
        scope.chooseNode = (node,$event)=>{
            var tmpNode  = node.parentNode,childNode = node,parentNode = node
            node.own = node.own ? 0 : 1 
            // while(tmpNode && tmpNode.title != '全选'){
            while(tmpNode){
                tmpNode.selectCount += childNode.own ? 1:-1
                var prevflg = tmpNode.own
                if(tmpNode.selectCount <= 0){
                    tmpNode.selectCount = 0
                    tmpNode.own = 0
                }else{
                    tmpNode.own = 1
                }
                if(prevflg == tmpNode.own){
                    break;
                }
                childNode = tmpNode
                tmpNode = tmpNode.parentNode
            }
            var diguiChild = (nd)=>{
                if(!nd || !nd.nodes) return
                nd.selectCount = nd.own ? nd.nodes.length:0
                nd.nodes.forEach((ndval)=>{
                    ndval.own = nd.own
                    diguiChild(ndval)
                })
            }
            diguiChild(node)
            if($event){
                $event.preventDefault()
                $event.stopPropagation()
            }
        }
        // scope.$on('expand',($event,data)=>{
        //     scope.expand(data)
        // })

        scope.nodeOperation = ($event,opr,node)=>{
            $event.preventDefault()
            $event.stopPropagation()
            scope.operation({
                opr:opr,
                node:node
            })
        }
    }
    
  }

}]