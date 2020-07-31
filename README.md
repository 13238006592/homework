# homework
简答题
一、谈谈你是如何理解JS异步编程的，EventLoop、消息队列都是做什么的，
    什么是宏任务，什么是微任务？
    答：异步编程解决了js单线程运行模式中，耗时任务阻塞程序运行，影响程序效率的问题。实现异步编程的几种方式：回调函数、事件监听、发布，订阅、Promise。
     
    因为js是单线程 所以所有的任务都要排队执行，任务分为两种：宏任务、微任务。
    消息队列：分为宏任务队列和微任务队列， 任务队列中的任务会依次取出到执行栈中 
    宏任务：script(整体代码)、setTimeout、setInterval、UI 渲染、 I/O、postMessage、 MessageChannel、setImmediate(Node.js 环境)
    微任务：Promise、 MutaionObserver、process.nextTick(Node.js环境)

    时间循环流程：1.执行宏任务队列中第一个任务，执行完后移除它
                 2.执行所有的微任务，执行完后移除它们
                 3.执行下一轮宏任务（重复步骤2）
