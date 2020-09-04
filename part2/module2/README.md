# homework
一、简答题
1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
答：1、根据模块化语句解析每个模块之间的依赖关系，形成依赖树
    2、通过配置文件中对应的loader加载资源文件
    3、根据配置项将loader加载的结果整合到打包文件中

    详细描述：在加载配置文件和 shell 后缀参数申明的插件，并传入构建信息 options 对象后，webpack进行初始化操作，生成compiler对象。
    初始化完成后自动自性compiler.run()方法开始编译和构建流程，首先run方法会触发compile,构建Compilation对象，这个对象有两个作用：
        一是负责组织整个打包过程，包含了每个构建环节及输出环节所对应的方法，比较关键的步骤，如 addEntry() , _addModuleChain() , buildModule() , seal() , createChunkAssets() (在每一个节点都会触发 webpack 事件去调用各插件)。
        二是该对象内部存放着所有 module ，chunk，生成的 asset 以及用来生成最后打包文件的 template 的信息。
    在创建 module 之前，Compiler 会触发 make，并调用 Compilation.addEntry 方法，通过 options 对象的 entry 字段找到我们的入口js文件。之后，在 addEntry 中调用私有方法 _addModuleChain ，这个方法主要做了两件事情。一是根据模块的类型获取对应的模块工厂并创建模块，二是构建模块。
    而构建模块作为最耗时的一步，又可细化为三步:
        1、调用各 loader 处理模块之间的依赖
        2、调用 acorn 解析经 loader 处理后的源文件生成抽象语法树 AST
        3、遍历 AST，构建该模块所依赖的模块
    module 是 webpack 构建的核心实体，也是所有 module的 父类，它有几种不同子类：NormalModule , MultiModule ,ContextModule , DelegatedModule 等。但这些核心实体都是在构建中都会去调用对应方法，也就是 build() 。对于每一个 module ，它都会有这样一个构建方法。当然，它还包括了从构建到输出的一系列的有关 module 生命周期的函数。
    在所有模块及其依赖模块 build 完成后，webpack 会监听 seal 事件调用各插件对构建后的结果进行封装，要逐次对每个 module 和 chunk 进行整理，生成编译后的源码，合并，拆分，生成 hash 。 同时这是我们在开发时进行代码优化和功能添加的关键环节。
    在封装过程中，webpack 会调用 Compilation 中的 createChunkAssets 方法进行打包后代码的生成。
    最后一步，webpack 调用 Compiler 中的 emitAssets() ，按照 output 中的配置项将文件输出到了对应的 path 中，从而 webpack 整个打包过程结束。要注意的是，若想对结果进行处理，则需要在 emit 触发后对自定义插件进行扩展。

2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
答：Loader只专注于转化文件（transform）这一个领域，完成压缩，打包，语言翻译
    plugin也是为了扩展webpack的功能，但是 plugin 是作用于webpack本身上的。而且plugin不仅只局限在打包，资源的加载上，它的功能要更加丰富。从打包优化和压缩，到重新定义环境变量，功能强大到可以用来处理各种各样的任务.
    从运行时机的角度区分:
        loader运行在打包文件之前（loader为在模块加载时的预处理文件）
        plugins在整个编译周期都起作用
    Loader开发：Loader导出一个函数，该函数接收一个source参数(包含加载的文件内容)，return一个js代码片段，且Loader可以像管道一样使用，我们可以把一个Loader的处理结果交给另一个Loader继续处理
    Plugin开发：Plugin导出一个包含apply方法的函数或类， apply方法接收一个compiler对象，我们可以使用该对象中提供的钩子函数在webpack的某个生命周期中实现我们想要的效果

二、编程题
1、使用 Webpack 实现 Vue 项目打包任务

项目说明:
    1、安装webpack-cli、webpack
    2、安装babel-loader、less-loader、css-loader、style-loader、file-loader、url-loader、vue-loader，配置webpack.common.js入口和输出，并使用对应的loader加载相应的模块
    3、配置webpack.dev.js添加devtool、devServer等参数
    4、配置webpack.prod.js添加optimization配置和上线前打包需要的插件copy-webpack-plugin、clean-webpack-plugin等
    5、使用merge方法在dev、prod配置文件中引入common
    