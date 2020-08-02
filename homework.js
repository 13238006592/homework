//代码题

//一
// const promise1 = Promise.resolve('hello');
// const promise2 = Promise.resolve('lagou');
// const promise3 = Promise.resolve('I ♥ U');
// Promise.all([promise1,promise2,promise3]).then(res=>console.log(res[0]+res[1]+res[2]))

//二--1

// const fp = require('lodash/fp')

// const compose = fp.flowRight(fp.prop('in_stock'),fp.last);  

//--2
// const fp = require('lodash/fp')

// const compose = fp.flowRight(fp.prop('name'),fp.first);  

//--3
// const fp = require('lodash/fp')

// const compose = fp.flowRight(_average,fp.map(v=>v.dollar_value));  
//--4
const fp = require('lodash/fp')
const _underscore = fp.replace(/\W+/g, '_');
const format = (v) => [v]

const sanitizeNames = fp.flowRight(format, fp.toLower, _underscore, fp.first);
console.log(sanitizeNames(["Hello World"]))

//三--1
// const fp = require('lodash/fp')

// const ex1 = () => {
//     const container = Container.of(1)
//     const newContainer =  container.map(fp.add(1))
//     const newMaybe = maybe.map(fp.map(fp.add(1)))
// }

//--2

const ex2 = ()=>{
    xs.map(fp.first).map(console.log)
}

//--3
const ex3 = ()=>{
    const functor = safeProp(user,name);
    functor.map(fp.flowRight(fp.first,fp.split('')));
}

//--4
const ex4 = n=>{
    return Maybe.of(n).map(parseInt);
}
