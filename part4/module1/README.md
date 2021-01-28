# homework
一、简答题
1. 请简述 React 16 版本中初始渲染的流程。
答：1. jsx 转换成 react 元素
            babel-react 会将jsx 调用 React.createElement
            React.createElement 会 jsx 转换成 react element （react element 就是 一个用来描述react 元素的对象。）
    2. render （协调层）此阶段负责创建 Fiber 数据结构并为 Fiber 节点打标记，标记当前 Fiber 节点要进行的 DOM 操作。
            首先为每一个react 元素构建 fiber 对象 (workInProgress Fiber 树）创建 此 fiber 对象对应的 DOM 对象，为 fiber 对象添加 effectTag 属性（用来记录当前 Fiber 要执行的 DOM 操作），然后在render 结束后， fiber 会被保存到 fiberroot 中。

    代码层步骤：
        将子树渲染到容器中 (初始化 Fiber 数据结构: 创建 fiberRoot 及 rootFiber)
        判断是否为服务器端渲染 如果不是服务器端渲染，清空 container 容器中的节点
        通过实例化 ReactDOMBlockingRoot 类创建 LegacyRoot，创建 LegacyRoot 的 Fiber 数据结构
        创建 container，创建根节点对应的 fiber 对象
        获取 container 的第一个子元素的实例对象
        计算任务的过期时间，再根据任务过期时间创建 Update 任务，将任务(Update)存放于任务队列(updateQueue)中。判断任务是否为同步 调用同步任务入口。
        构建 workInProgress Fiber 树
    3. commit 阶段 （渲染层）
        先获取到render 的结果， 在 fiberroot 中的 新构建的 workInProgress Fiber 树
        根据 fiber 中的 effectTag 属性进行相应的 DOM 操作


2. 为什么 React 16 版本中 render 阶段放弃了使用递归
    答：递归是在调用栈中执行的，没办法终止，长时间的递归操作占用了主进程，会导致用户界面卡顿，影响用户体验
        React 16增加了任务队列，将渲染操作拆分为细小的单元利用浏览器空余时间执行，提升了用户体验


3. 请简述 React 16 版本中 commit 阶段的三个子阶段分别做了什么事情
    答：(1)before mutation阶段（执行DOM操作前）:处理类组件的getSnapShotBeforeUpdate 生命周期函数
            处理DOM节点渲染/删除后的 autoFocus、blur逻辑；
            调用getSnapshotBeforeUpdate生命周期钩子；
            调度useEffect。
        (2)mutation阶段（执行DOM操作）:将 workInProgress Fiber 树变成 current Fiber 树
            如果该fiber类型是ClassComponent的话，执行getSnapshotBeforeUpdate生命周期api，将返回的值赋到fiber对象的__reactInternalSnapshotBeforeUpdate上；
            如果该fiber类型是FunctionComponent的话，执行hooks上的effect相关 API。
        代码层面：

            根据ContentReset effectTag重置文字节点；
            更新ref；
            根据effectTag分别处理，其中effectTag包括(Placement | Update | Deletion | Hydrating)；
            Placement时：获取父级DOM节点。其中finishedWork为传入的Fiber节点获取Fiber节点的DOM兄弟节点根据DOM兄弟节点是否存在决定调用parentNode.insertBefore或parentNode.appendChild执行DOM插入操作；
            Update时：执行所有useLayoutEffect hook的销毁函数。调用commitWork；6.Deletion时：递归调用Fiber节点及其子孙Fiber节点中fiber.tag为ClassComponent的componentWillUnmount
            (opens new window)生命周期钩子，从页面移除Fiber节点对应DOM节点解绑ref调度useEffect的销毁函数。
        (3)layout（执行 DOM 操作后）：commitHookEffectList()阶段，调用类组件生命周期函数或者函数组件的钩子函数
            ffect生成effect链，具体请看ReactFiberHooks.js中的pushEffect()

            ponentDidMount/componentWillUnmount）

        代码层面：

            调用componentDidxxx；
            调用this.setState第二个参数回调函数；
            调用useLayoutEffect hook的回调函数(与mutation的销毁函数是同步的)，调度useEffect的销毁与回调函数(在before
            mutation只是先调度加入异步任务，在这里才真正执行),因此useLayoutEffect是同步的，useEffect是异步的；
            获取DOM实例，更新ref5.current Fiber树切换(workInProgress Fiber树在commit阶段完成渲染后会变为current Fiber树)。


4. 请简述 workInProgress Fiber 树存在的意义是什么
    答：实现双缓存技术, 在内存中构建 DOM 结构以及 DOM 更新, 在 commit 阶段实现 DOM 的快速更新.
