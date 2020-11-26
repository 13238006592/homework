1、Vue 3.0 性能提升主要是通过哪几方面体现的？

    大幅提升运行时的性能：重写虚拟dom，效果提升30%~300%
    提升网络性能：tree-shaking机制
    完全typescript支持
    便利性改进方便程序员使用的：Fragment(模板更简单)、Teleport(布局更加灵活)、Suspense(强大的异步组件)、composition-api(逻辑重用)、生态圈改进

2、Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别？

    Options Api：缺点： 一个功能往往需要在不同的vue配置项中定义属性和方法，比较分散，项目小还好，清晰明了，但是项目大了后，一个methods中可能包含20多个方法，你往往分不清哪个方法对应着哪个功能

    Composition Api：一个功能所定义的所有api会放在一起，Composition API 是根据逻辑相关性组织代码的，提高可读性和可维护性，基于函数组合的 API 更好的重用逻辑代码

3、Proxy 相对于 Object.defineProperty 有哪些优点？

    可以直接监听对象而非属性
    可以直接监听数组的变化
    有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的
    返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改
    作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利

4、Vue 3.0 在编译方面有哪些优化？

    缓存事件处理函数
    标记提升静态根节点，优化了diff效率
    模版中无需创建静态根节点，可直接创建文本节点

5、Vue.js 3.0 响应式系统的实现原理？

``` 

let targetMap = new WeakMap()

let effectStack = [] //存储副作用

const track = (target, key) => {

    let effect = effectStack[effectStack.length -1]
    if(effect){
        //收集依赖
        let depMap = targetMap.get(target)
        if(depMap === undefined){
            depMap = new Map()
            targetMap.set(target,depMap)  //effect dep 集合
        }

        let dep = depMap.get(key)
        if(dep === undefined){
            dep = new Set() //存储effect
            depMap.set(key,dep)
        }

        if(!dep.has(effect)){
            dep.add(effect)
            effect.deps.push(dep)
        }
    }

}

const trigger = (target, key) => {

    let depMap = targetMap.get(target)
    if(depMap === undefined){
        return //没有副作用
    }

    const effects = new Set()
    const computeds = new Set()

    if(key){
        let deps = depMap.get(key)
        deps.forEach(effect => {
            if(effect.computed){
                computeds.add(effect)
            } else {
                effects.add(effect)
            }
        })
    }

    effects.forEach(effect => effect())
    computeds.forEach(computed => computed)

}

const handler = {

    get(target,key,receiver){
        track(target,key) //依赖收集
        let ret = Reflect.get(...arguments)
        return typeof ret == 'object' ? reactive(ret) : ret
    },
    set(target,key,value,receiver){
        let info = Reflect.set(...arguments)
        trigger(target,key)  //执行副作用
    }

}

const reactive = (target) => {

    let observe = new Proxy(target,handler)
    return observe

}

const effect = (fn, options={}) => {

    let e = crateRectiveEffect(fn,options)
    if(!options.lazy){
        e()
    }
    return e

}

const crateRectiveEffect = (fn, options) => {

    const effect = (...args) => {
        return run(effect, fn, args)
    }
    effect.deps = []
    effect.computed = options.computed
    effect.lazy = options.lazy
    return effect

}

//收集副作用 执行函数
const run = (effect, fn, args) => {

    console.log(fn);
    if(!effectStack.includes(effect)){
        try{
            effectStack.push(effect)
            return fn(...args)
        } finally {
            effectStack.pop()
        }
    }

}

const computed = (fn) => {

    const runner = effect(fn,{computed:true,lazy:true})
    return {
        // effect: runner,
        get value() {
            return runner()
        }
    }

}
```
