# homework

一、简答题
<br/>1. 通过该项目，请简要说明 typescript 比 javascript 的优势在哪？</br>

答：（1）、便于开发人员做注释。

（2）、能帮助开发人员检测出错误并修改。

（3）、TypeScript工具使重构更变的容易、快捷。

（4）、TypeScript 引入了 JavaScript 中没有的“类”概念。

（5）、TypeScript 中引入了模块的概念，可以把声明、数据、函数和类封装在模块中。

（6）、类型安全功能能在编码期间检测错误，这为开发人员创建了一个更高效的编码和调试过程。

2. 请简述一下支付流程

答：点击提交订单，服务端返回支付宝支付地址，支付后跳转到支付成功或支付失败页面，同时支付宝会向服务端告知支付结果

3.react-redux 的主要作用是什么，常用的 api 有哪些，什么作用？

答：react-redux配合redux使用，可以使组件轻松的拿到全局状态，方便组件间的通信。

react-redux主要提供两个方法Provider，connect

Provider主要用来传入store

connect接收四个参数：

``` 
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
```

4.redux 中的异步如何处理？

答：在组件中提交的action的type, 对应在saga中要处理的type, saga中处理完后, 再put提交对应在reducer中的type

``` 
import { call, put } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
function* fetchData(action) {
   try {
      const data = yield call(Api.fetchUser, action.payload.url);
      yield put({type: "FETCH_SUCCEEDED", data});
   } catch (error) {
      yield put({type: "FETCH_FAILED", error});
   }
}
export function* watchFetchData() {
  yield* takeEvery('FETCH_REQUESTED', fetchData)
}
```
