let _Vue=null
export default class vueRouter {
    static install(Vue) {
        //1.判断插件是否已经安装
        if(vueRouter.install.installed) return
        vueRouter.install.installed = true
        //2.把Vue构造函数记录到全局变量
        _Vue = Vue;
        //3.把router注入到Vue实例上
        // _Vue.prototype.$router = this.$options.router
        _Vue.mixin({
            beforeCreate(){
                if(this.$options.router){
                    _Vue.prototype.$router = this.$options.router
                    this.$options.router.init();
                }
            }
        })
    }
    constructor (options) {
        this.options = options;
        this.routeMap = {}
        this.data = _Vue.observable({
            current:location.hash.replace('#','')
        })
    }
    init(){
        this.createRouteMap();
        this.initComponents(_Vue)
        window.onhashchange = ()=>{
            this.data.current = location.hash.replace('#','')
        }
    }
    createRouteMap(){
       this.options.routes.forEach(route=>{
           this.routeMap[route.path] = route.component
       }) 
    }
    initComponents (Vue){
        const self = this;
        Vue.component('router-link',{
            props:{
                to:String
            },
            // template:'<a :href="to"><slot></slot></a>'
            render(h){
                return h('a',{
                    attrs:{
                        href:this.to
                    },
                    on:{
                        click:this.clickHandler
                    }
                },[this.$slots.default])
            },
            methods:{
                clickHandler(e){
                    e.preventDefault()
                    location.hash = this.to
                    // this.$router.data.current = this.to
                }
            }
        })
        Vue.component('router-view',{
            render(h){
                console.log(self.data.current)
                const component = self.routeMap[self.data.current]
                return h(component)
            }
        })
    }
}