# homework
简答题
一、答：执行结果为控制台打印 10，var关键字定义的i 是全局变量,循环结束时并不会销毁，当a[6]()调用的时候循环已经结束了，所以i的值是10；如果使用let关键字定义i则会因为循环外部对i有引用而形成闭包，循环过程中i的值得以通过闭包保存了下来，此时控制台会输出 6

二、答：会报错：Cannot access 'tmp' before initialization，if中重新声明了tmp，所以全局变量被覆写了，又因为使用的let关键字，没有变量声明提升特性，所以报错

三、答：
```
var arr = [12,34,32,89,4];

console.log(arr.sort((a,b)=>a-b)[0])
```
四、答：var 声明的变量是函数式作用域，且具有变量声明提升特性
let、const 声明的变量是块级作用域，不具有变量声明提升，切const定义的变量不可重新赋值

五、答：控制台输出 20，this.a最近的function是fn,fn的调用者是obj

六、答：过去对象的属性名只能是字符串，很容易造成属性名冲突，Symbol可以生成一个独一无二的的值，来作为对象的属性名

七、答：js中的引用对象类型，数据实际上是存储在堆内存中的，栈内存中存储的是堆内存地址，浅拷贝复制的就是栈中的地址，深拷贝则是复制的堆内存中的数据。
var a = {x:1,y:2}
浅拷贝 ： var b = a
深拷贝 ： var b = JSON.parse(JSON.stringfy(a))

八、答：TypeScript是JavaScript的超集，支持所有JavaScript用法和所有ECMAScript标准，并拥有强大的类型声明、检查、推断功能

九、答: 优点：可读性强、维护起来比较轻松，类型检查也让代码质量更加可靠，编译过程可以更早的暴露出代码中的问题
缺点：前期开发成本高，需要定义很多类型

十、答：引用计数算法会计算所有对象的引用次数，并存储在对象内部，一旦对象的引用计数变为0，就会被回收释放掉
 优点：最大程度减少程序暂停的次数
 缺点：该算法所需的时间成本较高

 十一、答：标记整理算法会给所有可达对象添加一个标记，将可达对象进行整理移动，清除掉没有标记的对象

 十二、答：先用标记整理算法标记可达对象，整理移动可达对象，释放无标记对象，让后把from复制到to,交换from和to的名字

 十三、答：老生代存储区垃圾回收时使用，因v8引擎中老生代存储区较新生代存储区大很多，GC算法所需时间也相应的会长很多，为了不影响客户端带来的体验，不至于在程序运行中产生明显的卡顿所以产生了增量标记算法。它就是将标记过程拆分为几个部分，分别穿插在程序中
