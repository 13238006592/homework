const { reject } = require("lodash");
const { resolve } = require("./Untitled-1");

/***
 *  1.new Promise((resolve,reject)=>{})
 *  2.三种状态 pending、fulfiled、rejected  ,状态确定后不可变
 *  3.resolve ：pending =>fulfilled, reject: pending=> rejected
 *  4.promise.then(value=>{},error=>{})
 *  5. then方法返回一个Promise对象
 *  6.then方法的返回值作为下一个then的回调函数的参数
 *  7.Promise.resolve()可接收普通值或promise对象，如果是promise直接return,如果是普通值包装成promise
 *  8
 */
const PENGDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise {
    constructor(fn) {
        fn(this.resolve, this.reject)

    }
    status = PENGDING;
    value = undefined;
    reason = undefined;

    success = [];
    failed = [];
    resolve = (value) => {

        if (this.status !== PENGDING) return
        this.status = FULFILLED;
        this.value = value;
        while (this.success.length) this.success.shift()();

    }
    reject = (error) => {

        if (this.status !== PENGDING) return
        this.status = REJECTED;
        this.reason = error;
        while (this.failed.length) this.failed.shift()()

    }
    then(successCallback, failCallback) {
        // 参数可选
        successCallback = successCallback ? successCallback : value => value;
        // 参数可选
        failCallback = failCallback ? failCallback : reason => { throw reason };
        let promsie2 = new MyPromise((resolve, reject) => {
            // 判断状态
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = successCallback(this.value);
                        // 判断 x 的值是普通值还是promise对象
                        // 如果是普通值 直接调用resolve 
                        // 如果是promise对象 查看promsie对象返回的结果 
                        // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
                        resolvePromise(promsie2, x, resolve, reject)
                    } catch (e) {
                        reject(e);
                    }
                }, 0)
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = failCallback(this.reason);
                        resolvePromise(promsie2, x, resolve, reject)
                    } catch (e) {
                        reject(e);
                    }
                }, 0)
            } else {
                // 将成功回调和失败回调存储起来
                this.success.push(() => {
                    setTimeout(() => {
                        try {
                            let x = successCallback(this.value);
                            resolvePromise(promsie2, x, resolve, reject)
                        } catch (e) {
                            reject(e);
                        }
                    }, 0)
                });
                this.failed.push(() => {
                    setTimeout(() => {
                        try {
                            let x = failCallback(this.reason);
                            resolvePromise(promsie2, x, resolve, reject)
                        } catch (e) {
                            reject(e);
                        }
                    }, 0)
                });
            }
        });
        return promsie2;
    }
    catch(failCallback) {
        return this.then(undefined, failCallback)
    }
    static resolve(v) {
        if (v instanceof MyPromise) {
            return v
        } else {
            return new MyPromise((resolve, reject) => { resolve(v) })
        }
    }
    finally(callback) {
        return this.then(value => {
            return MyPromise.resolve(callback()).then(() => value);
        }, reason => {
            return MyPromise.resolve(callback()).then(() => { throw reason })
        })
    }
    catch(failCallback) {
        return this.then(undefined, failCallback)
    }
    static all(array) {
        let result = [];
        let index = 0;
        return new MyPromise((resolve, reject) => {
            function addData(key, value) {
                result[key] = value;
                index++;
                if (index === array.length) {
                    resolve(result);
                }
            }
            for (let i = 0; i < array.length; i++) {
                let current = array[i];
                if (current instanceof MyPromise) {
                    // promise 对象
                    current.then(value => addData(i, value), reason => reject(reason))
                } else {
                    // 普通值
                    addData(i, array[i]);
                }
            }
        })
    }
}

function resolvePromise(promsie2, x, resolve, reject) {
    if (promsie2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if (x instanceof MyPromise) {
        // promise 对象
        x.then(resolve, reject);
    } else {
        // 普通值
        resolve(x);
    }
}

const other = () => {
    return new MyPromise((resolve, reject) => {
        resolve('other')
    })
}
let aaa = MyPromise.all([other(), 1, 2]).then(res => console.log(res[0]))
