# homework
一、简答题
1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。
let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler ()
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})

答：不是响应式的。可通过vm.someObject = Object.assign({}, vm.someObject, { dog:{name:'Trump'} })将新成员设置成响应式
 

2、请简述 Diff 算法的执行过程

答：diff算法只会进行同级比较，初始化时创建4个标记oldStart,oldEnd,newStart,newEnd,创建循环，当oldStart>oldEnd或newStart>newEnd时跳出循环，
    每次循环先判断oldStart和newStart是否是同一个节点，如果是，比较两个节点，newStart++,oldStart++;如果不是再继续依次判断oldEnd和newEnd,oldStart和newEnd,oldEnd和newStart;
    如果4种预设判断逻辑都没匹配到，将使用key值来比较
    最后如果老节点先遍历完，将新节点中未匹配到的节点新增到dom
    最后如果新节点先遍历完，将老节点中未匹配到的节点删除